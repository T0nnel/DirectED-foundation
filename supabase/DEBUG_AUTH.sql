-- ============================================
-- AUTH DEBUGGER
-- Run this to see exactly what is wrong with the account
-- ============================================

SELECT 
    u.id, 
    u.email, 
    u.email_confirmed_at,
    u.encrypted_password, -- If this is null, no password set
    u.last_sign_in_at,
    ur.role as assigned_role
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.id
WHERE u.email = 'tonnel@directed.dev';

-- IF THIS RETURNS NO ROWS: The account does not exist. You must Sign Up.
-- IF email_confirmed_at IS NULL: You need to run FIX_LOGIN_ISSUES.sql
-- IF assigned_role IS NULL or 'user': You need to run FIX_LOGIN_ISSUES.sql
