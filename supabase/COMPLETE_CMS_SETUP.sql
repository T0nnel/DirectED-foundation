-- ============================================
-- COMPLETE CMS SETUP - RUN THIS FIRST!
-- Creates all tables, adds multi-language, and makes you admin
-- ============================================

-- STEP 1: Create CMS Tables
-- ============================================

-- Create page_content table
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

-- Create content_history table
CREATE TABLE IF NOT EXISTS content_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID REFERENCES page_content(id) ON DELETE CASCADE,
    content_value TEXT NOT NULL,
    version INTEGER NOT NULL,
    changed_by UUID REFERENCES auth.users(id),
    changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page_name);
CREATE INDEX IF NOT EXISTS idx_page_content_language ON page_content(language_code);
CREATE INDEX IF NOT EXISTS idx_content_history_content ON content_history(content_id);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Everyone can read
CREATE POLICY "Anyone can read page content" ON page_content
    FOR SELECT USING (true);

CREATE POLICY "Anyone can read content history" ON content_history
    FOR SELECT USING (true);

-- Only admins can insert/update/delete
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

-- STEP 2: Make YOU admin
-- ============================================

DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- tonnel@directed.dev
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'tonnel@directed.dev';
    
    IF v_user_id IS NOT NULL THEN
        -- Confirm email
        UPDATE auth.users
        SET email_confirmed_at = NOW()
        WHERE id = v_user_id AND email_confirmed_at IS NULL;
        
        -- Assign admin role
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ tonnel@directed.dev is now an ADMIN!';
    ELSE
        RAISE NOTICE '❌ Account tonnel@directed.dev does not exist - create it in the app first';
    END IF;
    
    -- elleni.t.eshete@gmail.com
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'elleni.t.eshete@gmail.com';
    
    IF v_user_id IS NOT NULL THEN
        UPDATE auth.users
        SET email_confirmed_at = NOW()
        WHERE id = v_user_id AND email_confirmed_at IS NULL;
        
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ elleni.t.eshete@gmail.com is now an ADMIN!';
    ELSE
        RAISE NOTICE '❌ Account elleni.t.eshete@gmail.com does not exist yet';
    END IF;
END $$;

-- STEP 3: Verify Setup
-- ============================================

-- Check if you're an admin
SELECT 
    u.email,
    ur.role,
    u.email_confirmed_at IS NOT NULL as email_confirmed,
    CASE 
        WHEN ur.role = 'admin' THEN '✅ YOU ARE ADMIN!'
        ELSE '❌ Not admin yet'
    END as status
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.id
WHERE u.email IN ('tonnel@directed.dev', 'elleni.t.eshete@gmail.com')
ORDER BY u.email;

-- ============================================
-- DONE!  🎉
-- ============================================
-- Next steps:
-- 1. Go to your app
-- 2. Log OUT
-- 3. Log back IN as tonnel@directed.dev
-- 4. AdminToolbar will appear bottom-right!
-- 5. Click "Edit Mode: ON"
-- 6. Click any text to edit it
-- ============================================
