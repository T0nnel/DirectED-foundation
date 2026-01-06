-- ============================================
-- CMS + MULTI-LANGUAGE SETUP
-- Complete setup for Admin CMS and Language Support
-- ============================================

-- STEP 1: Create/Update CMS Tables with Language Support
-- ============================================

-- Create page_content table if not exists (with language support)
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

-- Add language_code column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'page_content' AND column_name = 'language_code'
    ) THEN
        ALTER TABLE page_content ADD COLUMN language_code TEXT NOT NULL DEFAULT 'en';
        
        -- Update unique constraint to include language_code
        ALTER TABLE page_content DROP CONSTRAINT IF EXISTS page_content_page_name_content_key_key;
        ALTER TABLE page_content ADD CONSTRAINT page_content_page_name_content_key_language_code_key 
            UNIQUE(page_name, content_key, language_code);
    END IF;
END $$;

-- Create content_history table for version tracking
CREATE TABLE IF NOT EXISTS content_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
    content_value TEXT NOT NULL,
    version INTEGER NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table if not exists
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 2: Create Indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page_name);
CREATE INDEX IF NOT EXISTS idx_page_content_language ON page_content(language_code);
CREATE INDEX IF NOT EXISTS idx_page_content_key ON page_content(content_key);
CREATE INDEX IF NOT EXISTS idx_content_history_content ON content_history(content_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- STEP 3: Enable RLS
-- ============================================

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create RLS Policies
-- ============================================

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Anyone can read page content" ON page_content;
DROP POLICY IF EXISTS "Admins can insert page content" ON page_content;
DROP POLICY IF EXISTS "Admins can update page content" ON page_content;
DROP POLICY IF EXISTS "Admins can delete page content" ON page_content;
DROP POLICY IF EXISTS "Anyone can read content history" ON content_history;
DROP POLICY IF EXISTS "Anyone can read user roles" ON user_roles;

-- Page Content Policies
CREATE POLICY "Anyone can read page content" ON page_content
    FOR SELECT USING (true);

CREATE POLICY "Admins can insert page content" ON page_content
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update page content" ON page_content
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete page content" ON page_content
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- Content History Policies
CREATE POLICY "Anyone can read content history" ON content_history
    FOR SELECT USING (true);

-- User Roles Policies
CREATE POLICY "Anyone can read user roles" ON user_roles
    FOR SELECT USING (true);

CREATE POLICY "Users can read own role" ON user_roles
    FOR SELECT USING (auth.uid() = id);

-- STEP 5: Create Storage Bucket for Images
-- ============================================

-- Create bucket for page images if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'page-images',
    'page-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for page images
DROP POLICY IF EXISTS "Anyone can view page images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload page images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update page images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete page images" ON storage.objects;

CREATE POLICY "Anyone can view page images" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'page-images');

CREATE POLICY "Admins can upload page images" ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'page-images' AND
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Admins can update page images" ON storage.objects
    FOR UPDATE
    USING (
        bucket_id = 'page-images' AND
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete page images" ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'page-images' AND
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_roles.id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- STEP 6: Create Trigger for Auto-Updating Timestamps
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
CREATE TRIGGER update_page_content_updated_at
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- STEP 7: Create Trigger for Content History
-- ============================================

CREATE OR REPLACE FUNCTION save_content_history()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.content_value IS DISTINCT FROM NEW.content_value THEN
        INSERT INTO content_history (content_id, content_value, version, changed_by)
        VALUES (OLD.id, OLD.content_value, OLD.version, auth.uid());
        
        NEW.version = OLD.version + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS save_content_history_trigger ON page_content;
CREATE TRIGGER save_content_history_trigger
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION save_content_history();

-- ============================================
-- SETUP COMPLETE! 
-- ============================================
-- The CMS system is now ready with:
-- ✅ Multi-language content support
-- ✅ Version history tracking
-- ✅ Admin-only editing
-- ✅ Image uploads to storage
-- ✅ Automatic timestamp updates
-- ============================================

-- To make a user an admin, run:
-- INSERT INTO user_roles (id, role) VALUES ('<user-uuid>', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';

