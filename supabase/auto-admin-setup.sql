-- ============================================
-- Auto-Admin Setup for Specific Email Addresses
-- ============================================

-- This script automatically grants admin role to specific email addresses

-- Method 1: Create a function to check and assign admin role
CREATE OR REPLACE FUNCTION auto_assign_admin_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the new user's email is in the admin list
    IF NEW.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev') THEN
        -- Insert admin role for this user
        INSERT INTO public.user_roles (id, role)
        VALUES (NEW.id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin';
    ELSE
        -- Insert regular user role
        INSERT INTO public.user_roles (id, role)
        VALUES (NEW.id, 'user')
        ON CONFLICT (id) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Method 2: Create trigger that runs when new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auto_assign_admin_role();

-- ============================================
-- One-time Manual Setup (if users already exist)
-- ============================================

-- Run this if the users already signed up before running the trigger
-- This finds users by email and assigns admin role

DO $$
DECLARE
    user_record RECORD;
BEGIN
    -- Loop through admin emails
    FOR user_record IN 
        SELECT id, email
        FROM auth.users
        WHERE email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev')
    LOOP
        -- Insert or update admin role
        INSERT INTO public.user_roles (id, role)
        VALUES (user_record.id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE 'Admin role assigned to: %', user_record.email;
    END LOOP;
END $$;

-- ============================================
-- Verify Admin Assignments
-- ============================================

-- Query to check current admin users
SELECT 
    u.email,
    ur.role,
    ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.id
WHERE u.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev')
ORDER BY u.email;
