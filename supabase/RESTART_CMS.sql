-- ==========================================
-- RESTART CMS & LANGUAGE SYSTEM
-- ==========================================

-- 1. CLEANUP
DROP TABLE IF EXISTS public.page_content CASCADE;
DROP TABLE IF EXISTS public.content_history CASCADE;
DROP TABLE IF EXISTS public.supported_languages CASCADE;

-- 2. CREATE LANGUAGES TABLE
CREATE TABLE public.supported_languages (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE
);

INSERT INTO public.supported_languages (code, name, is_default) VALUES
('en', 'English', TRUE),
('fr', 'Français', FALSE),
('es', 'Español', FALSE),
('sw', 'Kiswahili', FALSE),
('am', 'Amharic', FALSE),
('zh', 'Chinese', FALSE);

-- 3. CREATE CONTENT TABLE
-- This table stores ALL content (text and images) for ALL pages and languages
CREATE TABLE public.page_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,          -- e.g., '/home', '/about'
    section_key TEXT NOT NULL,        -- e.g., 'hero_title', 'mission_image'
    language_code TEXT NOT NULL REFERENCES public.supported_languages(code),
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image', 'richtext')),
    content_value TEXT NOT NULL,      -- Stores text or image URL
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id),
    
    -- Ensure unique combination of page, key, and language
    UNIQUE(page_path, section_key, language_code)
);

-- 4. ENABLE RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supported_languages ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES

-- Everyone can read content (Public Read)
CREATE POLICY "Public Read Content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Public Read Languages" ON public.supported_languages FOR SELECT USING (true);

-- Only Admins can edit (Insert/Update/Delete)
CREATE POLICY "Admin Write Content" ON public.page_content
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- 6. SETUP STORAGE FOR IMAGES
-- Create a bucket for CMS images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy for storage: Public Read, Admin Upload
CREATE POLICY "Public Access CMS Images" ON storage.objects
FOR SELECT USING (bucket_id = 'cms-images');

CREATE POLICY "Admin Upload CMS Images" ON storage.objects
FOR INSERT 
WITH CHECK (
  bucket_id = 'cms-images' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

CREATE POLICY "Admin Update CMS Images" ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'cms-images' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- 7. RE-ASSIGN ADMIN (Just in case)
-- Ensure 'tonnel@directed.dev' is admin
DO $$
DECLARE
    v_user_id UUID;
BEGIN
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'tonnel@directed.dev';
    
    IF v_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE SET role = 'admin';
    END IF;
END $$;
