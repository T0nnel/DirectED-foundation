# ⚡ FINAL SETUP - One-Shot Installation

## 🎯 Complete Setup in 3 Steps (5 minutes total)

### Step 1: Run SQL (2 minutes)
1. Open **Supabase Dashboard**: https://supabase.com/dashboard/project/lmpbrcuahblbnsbfnuuf
2. Click **SQL Editor** (left sidebar)
3. Create new query
4. Copy **ALL** of `supabase/FINAL_SETUP.sql`
5. Paste and click **RUN**
6. Wait for "Success" message

### Step 2: Create Storage Bucket (30 seconds)
1. Click **Storage** (left sidebar)
2. Click **New bucket**
3. Name: `page-images`
4. ✅ Check **Public bucket**
5. Click **Create bucket**

### Step 3: Test Login (1 minute)
1. Go to your app: http://localhost:8080/auth
2. **Sign up** with: `tonnel@directed.dev` (use any password)
3. Verify email if prompted
4. **Login** with same credentials
5. You should be redirected to `/?editMode=true`
6. Admin toolbar appears in bottom-right!

---

## ✅ What This Does

**Automatic admin assignment:**
- `elleni.t.eshete@gmail.com` → **AUTO ADMIN**
- `tonnel@directed.dev` → **AUTO ADMIN**

**How it works:**
- Those emails automatically get admin role on signup
- No manual database updates needed
- Works for new signups AND existing accounts
- Login automatically grants admin access

**No manual steps needed for admin assignment!**

---

## 🐛 Troubleshooting

**"Access Denied" after login:**
1. Make sure you ran FINAL_SETUP.sql completely
2. Check admin assignment worked:
```sql
SELECT u.email, ur.role 
FROM auth.users u
JOIN user_roles ur ON u.id = ur.id
WHERE u.email IN ('elleni.t.eshete@gmail.com', 'tonnel@directed.dev');
```
Should show `role = 'admin'`

3. Sign out completely:
   - Click "Sign Out"
   - Close ALL browser tabs
   - Open new incognito window
   - Login again

**Still not working:**
1. Verify .env file has correct credentials
2. Restart dev server: `npm run dev`
3. Clear browser cache/cookies
4. Try different browser or incognito mode

**Storage/images not working:**
- Verify `page-images` bucket exists in Storage
- Verify it's set to **Public**
- Check bucket policies are set

---

## 🎬 What You Can Do Now

**Edit Content:**
1. Login at `/auth`
2. Visit any page: `/contactus`, `/about`, `/team`, `/programs`
3. Click any text to edit it
4. See admin toolbar in bottom-right
5. Click "Save All Changes" to persist

**Admin Toolbar Controls:**
- **Edit Mode ON/OFF** - Toggle editing
- **Preview Mode** - See changes without edit UI
- **Save All Changes** - Persist to database
- **Discard Changes** - Revert unsaved edits

---

## 📝 Files Created

- `FINAL_SETUP.sql` - Complete database setup (RUN THIS)
- Previous files (schema.sql, seed.sql, etc.) - **IGNORE THESE, use FINAL_SETUP.sql only**

---

## 🎉 Done!

After these 3 steps, your CMS is fully operational:
- ✅ Database with all tables
- ✅ Auto-admin for 2 emails
- ✅ Content versioning
- ✅ Image uploads ready
- ✅ 4 pages with editable content

**Just run FINAL_SETUP.sql and create the storage bucket! That's it!**
