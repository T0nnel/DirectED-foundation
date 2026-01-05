# Admin Setup Guide

## Automatic Admin Assignment for Specific Emails

This setup ensures that `elleni.t.eshete@gmail.com` and `tonnel@directed.dev` are automatically granted admin access.

## Setup Steps

### Step 1: Run the Main Schema
First, make sure you've run the main schema:
```sql
-- Run this first: supabase/schema.sql
```

### Step 2: Set Up Auto-Admin
Run the auto-admin setup script:
```sql
-- Run this: supabase/auto-admin-setup.sql
```

This creates:
1. **Database Trigger** - Automatically assigns admin role when these emails sign up
2. **Manual Assignment** - Assigns admin role if users already exist

### Step 3: Verify Setup
After running the script, check the admin assignments:
```sql
SELECT 
    u.email,
    ur.role,
    ur.full_name
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.id
WHERE u.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev');
```

## How It Works

### For New Signups
When either of these emails signs up:
1. User creates account at `/auth`
2. Database trigger fires automatically
3. User is assigned `admin` role
4. On next login, they get admin access

### For Existing Users
If the users already have accounts:
1. The script automatically finds them
2. Assigns admin role
3. Next login grants admin access

## Testing

1. **Sign up** with one of the admin emails at `/auth`
2. **Login** - should redirect to `/?editMode=true`
3. **Admin toolbar** should appear in bottom-right
4. **Edit mode** toggle should be available

## Add More Admins Later

To add more admin emails in the future, edit the trigger function:

```sql
-- Edit this line in auto-admin-setup.sql
IF NEW.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev', 'new-admin@example.com') THEN
```

Then re-run the script in Supabase.

## Remove Admin Access

To remove admin access from a user:
```sql
UPDATE public.user_roles
SET role = 'user'
WHERE id = (
    SELECT id FROM auth.users 
    WHERE email = 'user-email@example.com'
);
```

## Troubleshooting

**Admin not working after signup:**
- Check that auto-admin-setup.sql was run after schema.sql
- Verify trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
- Check user_roles table: `SELECT * FROM user_roles WHERE role = 'admin';`

**Trigger not firing:**
- Make sure you have permission to create triggers on auth.users
- Try running the manual assignment section again
- Log out and log back in to refresh session
