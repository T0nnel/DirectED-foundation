import { supabase } from '@/integrations/supabase/client';

export interface PageContent {
    id: string;
    page_name: string;
    content_key: string;
    content_type: 'text' | 'richtext' | 'image' | 'html';
    content_value: string;
    version: number;
    created_at: string;
    updated_at: string;
    created_by: string | null;
}

export interface ContentHistory {
    id: string;
    content_id: string;
    content_value: string;
    version: number;
    changed_by: string | null;
    changed_at: string;
}

/**
 * Fetch all content for a specific page
 */
export async function fetchPageContent(pageName: string, languageCode: string = 'en'): Promise<PageContent[]> {
    const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', pageName)
        .eq('language_code', languageCode)
        .order('content_key');

    if (error) {
        console.error('Error fetching page content:', error);
        throw error;
    }

    return data || [];
}

/**
 * Get content by specific key
 */
export async function getContentByKey(
    pageName: string,
    contentKey: string,
    languageCode: string = 'en'
): Promise<PageContent | null> {
    const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', pageName)
        .eq('content_key', contentKey)
        .eq('language_code', languageCode)
        .single();

    if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is acceptable
        console.error('Error fetching content:', error);
        throw error;
    }

    return data;
}

/**
 * Update or create content
 */
export async function upsertContent(
    pageName: string,
    contentKey: string,
    contentType: PageContent['content_type'],
    contentValue: string
): Promise<PageContent> {
    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('page_content')
        .upsert({
            page_name: pageName,
            content_key: contentKey,
            content_type: contentType,
            content_value: contentValue,
            created_by: user?.user?.id,
        })
        .select()
        .single();

    if (error) {
        console.error('Error upserting content:', error);
        throw error;
    }

    return data;
}

/**
 * Bulk update multiple content items
 */
export async function bulkUpdateContent(
    updates: Array<{
        page_name: string;
        content_key: string;
        content_type: PageContent['content_type'];
        content_value: string;
    }>
): Promise<PageContent[]> {
    const { data: user } = await supabase.auth.getUser();

    const contentWithUser = updates.map((update) => ({
        ...update,
        created_by: user?.user?.id,
    }));

    const { data, error } = await supabase
        .from('page_content')
        .upsert(contentWithUser)
        .select();

    if (error) {
        console.error('Error bulk updating content:', error);
        throw error;
    }

    return data || [];
}

/**
 * Get content history for a specific content item
 */
export async function getContentHistory(contentId: string): Promise<ContentHistory[]> {
    const { data, error } = await supabase
        .from('content_history')
        .select('*')
        .eq('content_id', contentId)
        .order('changed_at', { ascending: false });

    if (error) {
        console.error('Error fetching content history:', error);
        throw error;
    }

    return data || [];
}

/**
 * Restore content to a previous version
 */
export async function restoreContentVersion(
    contentId: string,
    versionId: string
): Promise<PageContent> {
    // Get the historical version
    const { data: historyData, error: historyError } = await supabase
        .from('content_history')
        .select('content_value')
        .eq('id', versionId)
        .single();

    if (historyError) {
        console.error('Error fetching history:', historyError);
        throw historyError;
    }

    // Update the current content with the historical value
    const { data, error } = await supabase
        .from('page_content')
        .update({ content_value: historyData.content_value })
        .eq('id', contentId)
        .select()
        .single();

    if (error) {
        console.error('Error restoring content:', error);
        throw error;
    }

    return data;
}

/**
 * Upload image to Supabase storage
 */
export async function uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('page-images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage.from('page-images').getPublicUrl(filePath);

    return data.publicUrl;
}

/**
 * Delete image from Supabase storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    // Extract file path from URL
    const urlParts = imageUrl.split('/page-images/');
    if (urlParts.length !== 2) {
        throw new Error('Invalid image URL');
    }
    const filePath = urlParts[1];

    const { error } = await supabase.storage.from('page-images').remove([filePath]);

    if (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}

/**
 * Get all editable content across all pages (for admin overview)
 */
export async function getAllEditableContent(): Promise<
    Record<string, PageContent[]>
> {
    const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_name')
        .order('content_key');

    if (error) {
        console.error('Error fetching all content:', error);
        throw error;
    }

    // Group by page name
    const grouped: Record<string, PageContent[]> = {};
    data?.forEach((item) => {
        if (!grouped[item.page_name]) {
            grouped[item.page_name] = [];
        }
        grouped[item.page_name].push(item);
    });

    return grouped;
}
