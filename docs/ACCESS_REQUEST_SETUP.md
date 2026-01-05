# Access Request System Setup

## Quick Setup (2 steps)

### Step 1: Run the SQL (30 seconds)
1. Open Supabase Dashboard → SQL Editor
2. Copy and run: `supabase/access_requests.sql`

### Step 2: Test the System (2 minutes)

**As a regular user:**
1. Go to `/auth` and sign up with a non-admin email
2. Try to access `/admin`
3. You'll see "Access Denied" with contact: tonnel@directed.dev
4. Click "Request Admin Access"
5. Request is submitted

**As admin (tonnel@directed.dev):**
1. Login at `/auth`
2. Go to `/admin`
3. Click "Access Requests" button in header
4. See pending requests
5. Approve or reject with optional notes

---

## What This Does

✅ **Personalized Contact**: Shows `tonnel@directed.dev` as admin contact  
✅ **Request Access Button**: Users can request admin access with one click  
✅ **Admin Dashboard**: View all pending and reviewed requests at `/admin/access-requests`  
✅ **Approve/Reject**: Grant or deny admin access with notes  
✅ **Auto-upgrade**: Approved users get admin role immediately  
✅ **No duplicates**: Users can only submit one request  

---

## Features

### For Users (Non-Admin)
- See clear message: "Contact tonnel@directed.dev"
- Click "Request Admin Access" button
- Toast notification confirms submission
- Can't submit duplicate requests

### For Admin (tonnel@directed.dev)
- Access Requests button in admin header
- See all pending requests with:
  - User email
  - User name
  - Request date
  - Reason (if provided)
- Add admin notes when reviewing
- Approve → User gets admin role instantly
- Reject → Request marked as rejected
- View history of all reviewed requests

---

## Pages Created

- `/admin/access-requests` - Admin page to manage requests
- Updated `/admin` - Shows contact info and request button

---

## Database

New table: `access_requests`
- Tracks all access requests
- Statuses: pending, approved, rejected
- Stores reviewer info and notes
- One request per user (unique constraint)

---

## Done!

After running the SQL:
1. tonnel@directed.dev can review access requests
2. Other users see personalized contact info
3. Complete request/approval workflow works
