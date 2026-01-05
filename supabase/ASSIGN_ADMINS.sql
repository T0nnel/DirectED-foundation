-- ============================================
-- ASSIGN ADMIN ROLES
-- Run this in Supabase SQL Editor
-- ============================================

-- Assign admin role to the two specified emails
DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- tonnel@directed.dev
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'tonnel@directed.dev';
    
    IF v_user_id IS NOT NULL THEN
        -- Confirm email first
        UPDATE auth.users
        SET email_confirmed_at = NOW()
        WHERE id = v_user_id;
        
        -- Assign admin role
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ Admin role assigned to tonnel@directed.dev';
    ELSE
        RAISE NOTICE '❌ User tonnel@directed.dev does not exist yet';
    END IF;
    
    -- elleni.t.eshete@gmail.com
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'elleni.t.eshete@gmail.com';
    
    IF v_user_id IS NOT NULL THEN
        -- Confirm email first
        UPDATE auth.users
        SET email_confirmed_at = NOW()
        WHERE id = v_user_id;
        
        -- Assign admin role
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ Admin role assigned to elleni.t.eshete@gmail.com';
    ELSE
        RAISE NOTICE '❌ User elleni.t.eshete@gmail.com does not exist yet';
    END IF;
END $$;

-- Verify admin assignments
SELECT u.email, ur.role
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.id
WHERE u.email IN ('tonnel@directed.dev', 'elleni.t.eshete@gmail.com')
ORDER BY u.email;
