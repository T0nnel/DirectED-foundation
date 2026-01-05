-- ============================================
-- COMPLETE ONE-SHOT CMS SETUP
-- Run this ENTIRE file in Supabase SQL Editor
-- ============================================

-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Safe cleanup - only drop if exists
DO $$ 
BEGIN
    -- Drop triggers only if tables exist
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'page_content') THEN
        DROP TRIGGER IF EXISTS save_content_history_trigger ON page_content;
        DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
    END IF;
    
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_roles') THEN
        DROP TRIGGER IF EXISTS update_user_roles_updated_at ON user_roles;
    END IF;
    
    -- Drop trigger on auth.users
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    
    -- Drop functions
    DROP FUNCTION IF EXISTS auto_assign_admin_role() CASCADE;
    DROP FUNCTION IF EXISTS save_content_history() CASCADE;
    DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
    
    -- Drop tables
    DROP TABLE IF EXISTS content_history CASCADE;
    DROP TABLE IF EXISTS page_content CASCADE;
    DROP TABLE IF EXISTS user_roles CASCADE;
END $$;

-- ============================================
-- CREATE TABLES
-- ============================================

-- User roles table (simpler structure)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page content table
CREATE TABLE page_content (
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

-- Content history table
CREATE TABLE content_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
    content_value TEXT NOT NULL,
    version INTEGER NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX idx_page_content_page_name ON page_content(page_name);
CREATE INDEX idx_page_content_key ON page_content(content_key);
CREATE INDEX idx_content_history_content_id ON content_history(content_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- page_content policies - EVERYONE can read
CREATE POLICY "Anyone can read page content"
    ON page_content FOR SELECT
    USING (true);

-- Only admins can modify
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

-- user_roles policies - Allow users to read ANY role (needed for admin check)
CREATE POLICY "Anyone can read user roles"
    ON user_roles FOR SELECT
    USING (true);

-- Only admins can modify roles
CREATE POLICY "Admins can manage roles"
    ON user_roles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- TRIGGER FUNCTIONS
-- ============================================

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_page_content_updated_at
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Save content history
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

CREATE TRIGGER save_content_history_trigger
    BEFORE UPDATE ON page_content
    FOR EACH ROW
    EXECUTE FUNCTION save_content_history();

-- ============================================
-- AUTO-ADMIN ASSIGNMENT
-- ============================================

CREATE OR REPLACE FUNCTION auto_assign_admin_role()
RETURNS TRIGGER AS $$
BEGIN
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

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_admin_role();

-- ============================================
-- ASSIGN ADMIN TO EXISTING USERS
-- ============================================

DO $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Assign admin to existing users with those emails
    INSERT INTO user_roles (id, role)
    SELECT id, 'admin'
    FROM auth.users
    WHERE email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev')
    ON CONFLICT (id) DO UPDATE
    SET role = 'admin', updated_at = NOW();
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RAISE NOTICE 'Assigned admin role to % existing user(s)', v_count;
END $$;

-- ============================================
-- SEED INITIAL CONTENT
-- ============================================

INSERT INTO page_content (page_name, content_key, content_type, content_value) VALUES
-- Home page
('home', 'hero_slide_1_title', 'text', 'Empowering Africa''s Next Generation of Tech Leaders'),
('home', 'hero_slide_1_subtitle', 'text', 'World-class training and remote paid internships with US and European companies.'),
('home', 'mission_title', 'text', 'A World Where Potential Knows No Boundaries'),
('home', 'mission_description', 'text', 'We believe that every person deserves the opportunity to realize their full potential.'),
-- Contact page
('contact', 'hero_title', 'text', 'Get in Touch'),
('contact', 'hero_subtitle', 'text', 'Have questions? We''d love to hear from you.'),
('contact', 'email', 'text', 'info@directed.dev'),
('contact', 'phone', 'text', '+254 700 000 000'),
('contact', 'location', 'text', 'Nairobi, Kenya'),
-- About page
('about', 'hero_title', 'text', 'Who We Are'),
('about', 'hero_subtitle', 'text', 'A mission-driven organization dedicated to empowering Africa''s next generation.'),
('about', 'vision_title', 'text', 'A World Where Potential Knows No Boundaries'),
('about', 'vision_description_1', 'text', 'We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born.'),
('about', 'vision_description_2', 'text', 'Through world-class education and direct connections to global opportunities, we''re breaking down barriers.'),
-- Team page
('team', 'hero_title', 'text', 'Our Team'),
('team', 'hero_subtitle', 'text', 'Meet the dedicated professionals transforming lives through education.'),
-- Programs page
('programs', 'hero_title', 'text', 'Our Programs'),
('programs', 'hero_subtitle', 'text', 'Discover our initiatives making a difference in communities.')
ON CONFLICT (page_name, content_key) DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================

-- Show admin users
SELECT 
    u.email,
    ur.role,
    ur.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.id
WHERE ur.role = 'admin'
ORDER BY u.email;

-- Show content count
SELECT 
    page_name,
    COUNT(*) as content_items
FROM page_content
GROUP BY page_name
ORDER BY page_name;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next step: Create storage bucket 'page-images'
-- Go to: Storage → New bucket → Name: page-images → Public: YES
