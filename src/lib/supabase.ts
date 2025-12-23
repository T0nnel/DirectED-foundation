import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

// Helper function to get current user
export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
};

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) throw error;
    return data;
};

// Helper function to check if user is admin
export const isAdmin = async () => {
    const user = await getCurrentUser();
    if (!user) return false;

    const profile = await getUserProfile(user.id);
    return profile?.role === 'admin';
};

// Helper function for uploading images
export const uploadSubmissionImage = async (
    file: File,
    userId: string,
    submissionId?: string
): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${userId}/${submissionId || 'temp'}/${fileName}`;

    const { data, error } = await supabase.storage
        .from('submission-images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('submission-images')
        .getPublicUrl(filePath);

    return publicUrl;
};

// Helper function for deleting images
export const deleteSubmissionImage = async (imageUrl: string): Promise<void> => {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/submission-images/');
    const filePath = pathParts[1];

    const { error } = await supabase.storage
        .from('submission-images')
        .remove([filePath]);

    if (error) throw error;
};
