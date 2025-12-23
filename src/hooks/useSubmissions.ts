import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, getCurrentUser, uploadSubmissionImage } from '@/lib/supabase';
import type {
    Submission,
    SubmissionFormData,
    SubmissionFilters,
    PaginationParams,
    PaginatedResponse,
    SubmissionStatus
} from '@/types/submission';

// =====================================================
// QUERY HOOKS
// =====================================================

/**
 * Fetch all submissions with optional filters and pagination
 */
export const useSubmissions = (
    filters?: SubmissionFilters,
    pagination?: PaginationParams
) => {
    return useQuery({
        queryKey: ['submissions', filters, pagination],
        queryFn: async (): Promise<PaginatedResponse<Submission>> => {
            let query = supabase
                .from('submissions')
                .select('*', { count: 'exact' });

            // Apply filters
            if (filters?.status) {
                query = query.eq('status', filters.status);
            }
            if (filters?.type) {
                query = query.eq('type', filters.type);
            }
            if (filters?.author_id) {
                query = query.eq('author_id', filters.author_id);
            }
            if (filters?.featured !== undefined) {
                query = query.eq('featured', filters.featured);
            }
            if (filters?.search) {
                query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`);
            }

            // Apply pagination
            if (pagination) {
                const { page, perPage } = pagination;
                const from = (page - 1) * perPage;
                const to = from + perPage - 1;
                query = query.range(from, to);
            }

            // Order by created_at descending
            query = query.order('created_at', { ascending: false });

            const { data, error, count } = await query;

            if (error) throw error;

            const totalPages = pagination
                ? Math.ceil((count || 0) / pagination.perPage)
                : 1;

            return {
                data: data || [],
                total: count || 0,
                page: pagination?.page || 1,
                perPage: pagination?.perPage || data?.length || 0,
                totalPages
            };
        },
    });
};

/**
 * Fetch submissions by current user
 */
export const useMySubmissions = () => {
    return useQuery({
        queryKey: ['my-submissions'],
        queryFn: async () => {
            const user = await getCurrentUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('submissions')
                .select('*')
                .eq('author_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

/**
 * Fetch single submission by ID
 */
export const useSubmission = (id: string) => {
    return useQuery({
        queryKey: ['submission', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('submissions')
                .select(`
          *,
          author:user_profiles!author_id(*)
        `)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
};

/**
 * Fetch pending submissions (for admin)
 */
export const usePendingSubmissions = () => {
    return useQuery({
        queryKey: ['submissions', 'pending'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('submissions')
                .select(`
          *,
          author:user_profiles!author_id(*)
        `)
                .eq('status', 'pending')
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data;
        },
    });
};

// =====================================================
// MUTATION HOOKS
// =====================================================

/**
 * Create a new submission
 */
export const useCreateSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: SubmissionFormData) => {
            const user = await getCurrentUser();
            if (!user) throw new Error('Not authenticated');

            const { data: submission, error } = await supabase
                .from('submissions')
                .insert({
                    ...data,
                    author_id: user.id,
                    author_name: user.user_metadata?.full_name || user.email,
                    status: 'draft'
                })
                .select()
                .single();

            if (error) throw error;
            return submission;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
};

/**
 * Update an existing submission
 */
export const useUpdateSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<SubmissionFormData> }) => {
            const { data: submission, error } = await supabase
                .from('submissions')
                .update(data)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return submission;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['submission', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
};

/**
 * Submit a draft for review
 */
export const useSubmitForReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data, error } = await supabase
                .from('submissions')
                .update({ status: 'pending' })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
};

/**
 * Delete a submission
 */
export const useDeleteSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('submissions')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
    });
};

/**
 * Approve a submission (Admin only)
 */
export const useApproveSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, publishNow = true }: { id: string; publishNow?: boolean }) => {
            const user = await getCurrentUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('submissions')
                .update({
                    status: 'approved' as SubmissionStatus,
                    reviewed_by: user.id,
                    reviewed_at: new Date().toISOString(),
                    published_at: publishNow ? new Date().toISOString() : null
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
            queryClient.invalidateQueries({ queryKey: ['submissions', 'pending'] });
        },
    });
};

/**
 * Reject a submission (Admin only)
 */
export const useRejectSubmission = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
            const user = await getCurrentUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('submissions')
                .update({
                    status: 'rejected' as SubmissionStatus,
                    reviewed_by: user.id,
                    reviewed_at: new Date().toISOString(),
                    rejection_reason: reason
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
            queryClient.invalidateQueries({ queryKey: ['submissions', 'pending'] });
        },
    });
};

/**
 * Upload image for submission
 */
export const useUploadImage = () => {
    return useMutation({
        mutationFn: async ({ file, userId, submissionId }: {
            file: File;
            userId: string;
            submissionId?: string
        }) => {
            return await uploadSubmissionImage(file, userId, submissionId);
        },
    });
};
