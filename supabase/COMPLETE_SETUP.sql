-- ============================================
-- COMPLETE DATABASE SETUP FOR CMS
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- Step 1: Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STEP 2: CREATE TABLES
-- ============================================

-- Table for storing dynamic page content
CREATE TABLE IF NOT EXISTS page_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_name TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'richtext', 'image', 'html')),
    content_value TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    UNIQUE(page_name, content_key)
);

-- Table for content version history
CREATE TABLE IF NOT EXISTS content_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
    content_value TEXT NOT NULL,
    version INTEGER NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for user roles (extends auth.users)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 3: CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_page_content_page_name ON page_content(page_name);
CREATE INDEX IF NOT EXISTS idx_page_content_key ON page_content(content_key);
CREATE INDEX IF NOT EXISTS idx_content_history_content_id ON content_history(content_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- ============================================
-- STEP 4: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 5: CREATE RLS POLICIES
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read page content" ON page_content;
DROP POLICY IF EXISTS "Admins can insert content" ON page_content;
DROP POLICY IF EXISTS "Admins can update content" ON page_content;
DROP POLICY IF EXISTS "Admins can delete content" ON page_content;
DROP POLICY IF EXISTS "Anyone can read content history" ON content_history;
DROP POLICY IF EXISTS "Admins can insert history" ON content_history;
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON user_roles;

-- page_content policies
CREATE POLICY "Anyone can read page content"
    ON page_content FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert content"
    ON page_content FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update content"
    ON page_content FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete content"
    ON page_content FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- content_history policies
CREATE POLICY "Anyone can read content history"
    ON content_history FOR SELECT
    USING (true);

CREATE POLICY "Admins can insert history"
    ON content_history FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- user_roles policies
CREATE POLICY "Users can read own role"
    ON user_roles FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Admins can manage roles"
    ON user_roles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- STEP 6: CREATE TRIGGER FUNCTIONS
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
CREATE TRIGGER update_page_content_updated_at
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_roles_updated_at ON user_roles;
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to save content history when content is updated
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
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS save_content_history_trigger ON page_content;
CREATE TRIGGER save_content_history_trigger
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION save_content_history();

-- ============================================
-- STEP 7: AUTO-ASSIGN ADMIN ROLE
-- ============================================

-- Function to automatically assign admin role to specific emails
CREATE OR REPLACE FUNCTION auto_assign_admin_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the new user's email is in the admin list
    IF NEW.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev') THEN
        INSERT INTO public.user_roles (id, role)
        VALUES (NEW.id, 'admin')
        ON CONFLICT (id) DO UPDATE SET role = 'admin';
    ELSE
        INSERT INTO public.user_roles (id, role)
        VALUES (NEW.id, 'user')
        ON CONFLICT (id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_admin_role();

-- ============================================
-- STEP 8: ASSIGN ADMIN TO EXISTING USERS
-- ============================================

-- Update existing users with admin emails to have admin role
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN 
        SELECT id, email
        FROM auth.users
        WHERE email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev')
    LOOP
        INSERT INTO public.user_roles (id, role)
        VALUES (user_record.id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE 'Admin role assigned to: %', user_record.email;
    END LOOP;
END $$;

-- ============================================
-- STEP 9: SEED INITIAL CONTENT (Optional)
-- ============================================

-- Home page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('home', 'hero_slide_1_title', 'text', 'Empowering Africa''s Next Generation of Tech Leaders'),
('home', 'hero_slide_1_subtitle', 'text', 'World-class training and remote paid internships with US and European companies.'),
('home', 'mission_title', 'text', 'A World Where Potential Knows No Boundaries'),
('home', 'mission_description', 'text', 'We believe that every person deserves the opportunity to realize their full potential.')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- Contact page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('contact', 'hero_title', 'text', 'Get in Touch'),
('contact', 'hero_subtitle', 'text', 'Have questions? We''d love to hear from you.'),
('contact', 'email', 'text', 'info@directed.dev'),
('contact', 'phone', 'text', '+254 700 000 000'),
('contact', 'location', 'text', 'Nairobi, Kenya')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- About page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('about', 'hero_title', 'text', 'Who We Are'),
('about', 'hero_subtitle', 'text', 'A mission-driven organization dedicated to empowering Africa''s next generation.'),
('about', 'vision_title', 'text', 'A World Where Potential Knows No Boundaries')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- Team page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('team', 'hero_title', 'text', 'Our Team'),
('team', 'hero_subtitle', 'text', 'Meet the dedicated professionals transforming lives through education.')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- Programs page content
INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
('programs', 'hero_title', 'text', 'Our Programs'),
('programs', 'hero_subtitle', 'text', 'Discover our initiatives making a difference in communities.')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- ============================================
-- STEP 10: VERIFY SETUP
-- ============================================

-- Check admin users
SELECT 
    u.email,
    ur.role,
    ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.id
WHERE u.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev')
ORDER BY u.email;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Create 'page-images' storage bucket in Supabase Storage
-- 2. Set bucket to public read access
-- 3. Sign up with admin emails at /auth
-- 4. Login and start editing!
