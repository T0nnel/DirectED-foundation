-- ============================================
-- JUST MAKE ME ADMIN (Tables already exist!)
-- ============================================

-- Make tonnel@directed.dev an admin
DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Get user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'tonnel@directed.dev';
    
    IF v_user_id IS NOT NULL THEN
        -- Confirm email
        UPDATE auth.users
        SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
        WHERE id = v_user_id;
        
        -- Make admin
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ SUCCESS! You are now an ADMIN!';
    ELSE
        RAISE NOTICE '❌ ERROR: No account found for tonnel@directed.dev';
        RAISE NOTICE 'Create the account in the app first, then run this script.';
    END IF;
END $$;

-- Verify you're an admin
SELECT 
    u.email,
    ur.role,
    u.email_confirmed_at,
    CASE 
        WHEN ur.role = 'admin' THEN '🎉 YOU ARE ADMIN!'
        ELSE '❌ Not admin'
    END as status
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.id
WHERE u.email = 'tonnel@directed.dev';

-- ============================================
-- ✅ NEXT STEPS:
-- ============================================
-- 1. Log OUT of the app
-- 2. Log back IN as tonnel@directed.dev
-- 3. Refresh the page
-- 4. AdminToolbar appears bottom-right!
-- ============================================
