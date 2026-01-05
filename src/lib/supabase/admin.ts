import { supabase } from '@/integrations/supabase/client';

export interface UserRole {
    id: string;
    role: 'admin' | 'user';
    full_name: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Check if the current user has admin role
 */
export async function checkAdminRole(): Promise<boolean> {
    const { data: user } = await supabase.auth.getUser();

    if (!user.user) {
        return false;
    }

    const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', user.user.id)
        .single();

    if (error) {
        console.error('Error checking admin role:', error);
        return false;
    }

    return data?.role === 'admin';
}

/**
 * Get user role information
 */
export async function getUserRole(userId?: string): Promise<UserRole | null> {
    let targetUserId = userId;

    if (!targetUserId) {
        const { data: user } = await supabase.auth.getUser();
        targetUserId = user.user?.id;
    }

    if (!targetUserId) {
        return null;
    }

    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('id', targetUserId)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user role:', error);
        throw error;
    }

    return data;
}

/**
 * Set user role (admin only)
 */
export async function setUserRole(
    userId: string,
    role: 'admin' | 'user',
    fullName?: string
): Promise<UserRole> {
    const { data, error } = await supabase
        .from('user_roles')
        .upsert({
            id: userId,
            role,
            full_name: fullName,
        })
        .select()
        .single();

    if (error) {
        console.error('Error setting user role:', error);
        throw error;
    }

    return data;
}

/**
 * Get all users with their roles (admin only)
 */
export async function getAllUsers(): Promise<UserRole[]> {
    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        throw error;
    }

    return data || [];
}

/**
 * Create user role entry after signup
 * This should be called after a new user signs up
 */
export async function createUserRole(
    userId: string,
    fullName?: string,
    role: 'admin' | 'user' = 'user'
): Promise<UserRole> {
    const { data, error } = await supabase
        .from('user_roles')
        .insert({
            id: userId,
            role,
            full_name: fullName,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating user role:', error);
        throw error;
    }

    return data;
}
