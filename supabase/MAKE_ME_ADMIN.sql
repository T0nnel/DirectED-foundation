-- ============================================
-- ONE-CLICK ADMIN SETUP
-- Makes tonnel@directed.dev an admin immediately
-- ============================================

-- Step 1: Confirm email (bypass verification)
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'tonnel@directed.dev' AND email_confirmed_at IS NULL;

-- Step 2: Make admin
INSERT INTO public.user_roles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'tonnel@directed.dev'
ON CONFLICT (id) DO UPDATE
SET role = 'admin', updated_at = NOW();

-- Step 3: Verify
SELECT 
    u.email,
    ur.role,
    u.email_confirmed_at IS NOT NULL as email_confirmed
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.id
WHERE u.email = 'tonnel@directed.dev';

-- Should show: tonnel@directed.dev | admin | true
