-- ============================================
-- FIX LOGIN ISSUES
-- Run this in Supabase SQL Editor
-- ============================================

DO $$
DECLARE
    v_user_id UUID;
    v_email TEXT := 'tonnel@directed.dev'; -- The email to fix
BEGIN
    -- 1. Get user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = v_email;

    -- 2. Check if user exists
    IF v_user_id IS NULL THEN
        RAISE NOTICE '❌ User % does NOT exist. You must SIGN UP first at /auth', v_email;
    ELSE
        -- 3. Confirm email (fix "Email not confirmed" error)
        UPDATE auth.users
        SET email_confirmed_at = NOW(),
            confirmed_at = NOW()
        WHERE id = v_user_id;
        
        RAISE NOTICE '✅ Email manually confirmed for %', v_email;

        -- 4. Ensure Admin Role
        INSERT INTO public.user_roles (id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
        
        RAISE NOTICE '✅ Admin role assigned to %', v_email;
        
        RAISE NOTICE '👉 You can now log in with your password.';
    END IF;
END $$;
