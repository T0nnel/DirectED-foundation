-- STEP 1: Verify your account exists and get your user ID
-- Run this first to confirm your account is in the system
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'YOUR_EMAIL_HERE';
-- Replace YOUR_EMAIL_HERE with the email you used to sign up

-- STEP 2: Check if you have a user profile
-- This will show if you have a profile and what role you have
SELECT user_id, role, full_name 
FROM public.user_profiles 
WHERE user_id = '8443f444-ac57-427f-a0e4-044a8df2da19';

-- STEP 3: Set yourself as admin (RUN THIS!)
-- This will create or update your profile to have admin role
INSERT INTO public.user_profiles (user_id, role, full_name)
VALUES ('8443f444-ac57-427f-a0e4-044a8df2da19', 'admin', 'Your Name')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';

-- STEP 4: Verify admin role was set
-- Run this to confirm you're now an admin
SELECT user_id, role, full_name 
FROM public.user_profiles 
WHERE user_id = '8443f444-ac57-427f-a0e4-044a8df2da19' AND role = 'admin';

-- If STEP 4 returns a row, you're all set! 
-- Log out and log back in to see the admin access.
