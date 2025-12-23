// TypeScript types for the content submission system

export type SubmissionType = 'story' | 'news' | 'update' | 'report';
export type SubmissionStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type UserRole = 'admin' | 'editor' | 'contributor';

export interface UserProfile {
    user_id: string;
    role: UserRole;
    full_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Submission {
    id: string;
    created_at: string;
    updated_at: string;

    // Content
    type: SubmissionType;
    title: string;
    summary: string;
    content: string;
    category: string | null;
    tags: string[];

    // Media
    image_url: string | null;
    image_caption: string | null;
    additional_images: string[];

    // Metadata
    author_id: string | null;
    author_name: string | null;
    location: string | null;
    program: string | null;

    // Workflow
    status: SubmissionStatus;
    reviewed_by: string | null;
    reviewed_at: string | null;
    rejection_reason: string | null;

    // Publishing
    published_at: string | null;
    featured: boolean;
}

export interface SubmissionFormData {
    type: SubmissionType;
    title: string;
    summary: string;
    content: string;
    category?: string;
    tags?: string[];
    image_url?: string;
    image_caption?: string;
    location?: string;
    program?: string;
}

export interface SubmissionWithAuthor extends Submission {
    author?: UserProfile;
    reviewer?: UserProfile;
}

// Database query filters
export interface SubmissionFilters {
    status?: SubmissionStatus;
    type?: SubmissionType;
    author_id?: string;
    featured?: boolean;
    search?: string;
}

// For pagination
export interface PaginationParams {
    page: number;
    perPage: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}
