-- ============================================
-- ALLOW ANY AUTHENTICATED USER TO EDIT
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create page_content table if not exists
CREATE TABLE IF NOT EXISTS page_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_name TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'richtext', 'image', 'html')),
    content_value TEXT NOT NULL,
    language_code TEXT NOT NULL DEFAULT 'en',
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(page_name, content_key, language_code)
);

-- Step 2: Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop old admin-only policies
DROP POLICY IF EXISTS "Anyone can read page content" ON page_content;
DROP POLICY IF EXISTS "Admins can insert page content" ON page_content;
DROP POLICY IF EXISTS "Admins can update page content" ON page_content;
DROP POLICY IF EXISTS "Admins can delete page content" ON page_content;
DROP POLICY IF EXISTS "Authenticated users can insert page content" ON page_content;
DROP POLICY IF EXISTS "Authenticated users can update page content" ON page_content;
DROP POLICY IF EXISTS "Authenticated users can delete page content" ON page_content;

-- Step 4: Create new policies - ANY authenticated user can edit
CREATE POLICY "Anyone can read page content" ON page_content
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert page content" ON page_content
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update page content" ON page_content
    FOR UPDATE
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete page content" ON page_content
    FOR DELETE
    USING (auth.uid() IS NOT NULL);

-- Step 5: Create storage bucket for images if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'page-images',
    'page-images',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Step 6: Update storage policies - ANY authenticated user can upload
DROP POLICY IF EXISTS "Anyone can view page images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload page images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update page images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete page images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload page images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update page images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete page images" ON storage.objects;

CREATE POLICY "Anyone can view page images" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'page-images');

CREATE POLICY "Authenticated users can upload page images" ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'page-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update page images" ON storage.objects
    FOR UPDATE
    USING (bucket_id = 'page-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete page images" ON storage.objects
    FOR DELETE
    USING (bucket_id = 'page-images' AND auth.uid() IS NOT NULL);

-- ============================================
-- DONE! ✅
-- Any logged-in user can now edit content
-- ============================================
-- To test:
-- 1. Log in with any account
-- 2. Edit mode will be automatically enabled
-- 3. Hover over text/images to edit them
-- ============================================

SELECT 'SUCCESS! Any authenticated user can now edit content.' as status;

