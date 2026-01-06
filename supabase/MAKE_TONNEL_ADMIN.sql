-- ============================================
-- MAKE tonnel@directed.dev AN ADMIN
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policy for reading roles (if not exists)
DROP POLICY IF EXISTS "Anyone can read user roles" ON user_roles;
CREATE POLICY "Anyone can read user roles" ON user_roles
    FOR SELECT USING (true);

-- Step 4: Make tonnel@directed.dev an admin
DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Find the user by email
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'tonnel@directed.dev';
    
    IF v_user_id IS NOT NULL THEN
        -- Confirm email if not confirmed
        UPDATE auth.users
        SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
        WHERE id = v_user_id;
        
        -- Assign admin role
        INSERT INTO user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ SUCCESS: tonnel@directed.dev is now an ADMIN!';
        RAISE NOTICE 'User ID: %', v_user_id;
    ELSE
        RAISE NOTICE '❌ ERROR: User tonnel@directed.dev not found!';
        RAISE NOTICE 'Please create an account first at /auth page, then run this script again.';
    END IF;
END $$;

-- Step 5: Verify the admin status
SELECT 
    u.email,
    u.id as user_id,
    ur.role,
    u.email_confirmed_at IS NOT NULL as email_confirmed,
    CASE 
        WHEN ur.role = 'admin' THEN '✅ ADMIN - Ready to edit!'
        WHEN ur.role IS NULL THEN '❌ No role assigned'
        ELSE '⚠️ Role: ' || ur.role
    END as status
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.id
WHERE u.email = 'tonnel@directed.dev';

-- ============================================
-- DONE! Now:
-- 1. Go to your website
-- 2. Log OUT if already logged in
-- 3. Log IN as tonnel@directed.dev
-- 4. You'll be redirected to home with Edit Mode enabled
-- 5. Hover over any text/image to edit it!
-- ============================================

