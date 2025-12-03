# Deployment Checklist - Real Estate ERP

## ✅ Completed Local Setup
- [x] PostgreSQL database running locally
- [x] Environment variables configured (.env)
- [x] Database seeded with test data
- [x] All API endpoints working
- [x] Frontend connected to backend
- [x] Data persistence working

## 🚀 Vercel Production Deployment

### Critical: Add Environment Variable

**You MUST add this to Vercel to fix the "Invalid data format" error:**

1. Go to: https://vercel.com/dashboard
2. Select project: `real-estate-app` (or your project name)
3. Navigate to: **Settings** → **Environment Variables**
4. Add the following:

```
Key: JWT_SECRET
Value: KGuZM61xYtvfzq0+1E7tJ9lqJOJIhOAYKRlWBkrU7H0=
Environments: ✓ Production ✓ Preview ✓ Development
```

5. Click **Save**
6. Vercel will automatically redeploy

### Why This Is Required

Without `JWT_SECRET`, the API authentication fails and returns error objects `{error: "..."}` instead of data arrays `[]`, causing:
- ❌ "Invalid data format received" errors
- ❌ `m.map is not a function` TypeError
- ❌ Pages crashing on load

With `JWT_SECRET` set:
- ✅ Authentication works properly
- ✅ API returns correct data arrays
- ✅ All pages load successfully
- ✅ Data persistence works across sessions

## 📝 Recent Fixes Applied

### 1. API Response Format Fixed
- **Before**: `{ clients: [...] }`, `{ leads: [...] }`, `{ products: [...] }`
- **After**: `[...]` (arrays directly)
- **Impact**: Prevents data format errors

### 2. Error Handling Added
```typescript
// Validates responses are arrays
if (Array.isArray(data)) {
  setClients(data);
} else {
  setClients([]);
  toast.error('Invalid data format');
}
```

### 3. Database Schema Updated
- Added `phone` field to User model
- Migration created: `20251203153743_add_phone_to_user`
- Vercel will auto-apply with `prisma db push`

### 4. Client Creation Fixed
- Now creates User first, then Client
- Handles email uniqueness
- Returns formatted data matching frontend

### 5. Lead Creation Fixed
- Accepts `title`, `contactName`, `contactEmail`
- Maps to database schema correctly
- Returns formatted response

## 🧪 Testing After Deployment

Once JWT_SECRET is added to Vercel:

1. **Login Test**
   - Go to production URL: `https://your-app.vercel.app/login`
   - Email: `admin@nexuserp.com`
   - Password: `admin123`
   - ✅ Should redirect to dashboard

2. **Data Display Test**
   - Click "Clients" - should show existing clients
   - Click "Leads" - should show Kanban board with leads
   - Click "Properties" - should show property listings
   - ✅ No "Invalid data format" errors

3. **Data Creation Test**
   - Add a new client → logout → login
   - Client should still be there ✅
   - Add a new lead → logout → login  
   - Lead should still be there ✅
   - Add a property → logout → login
   - Property should still be there ✅

4. **Settings Test**
   - Update phone number in settings
   - Logout and login
   - Phone number should persist ✅

## 📊 Database State

### Production Database (Neon)
- Already seeded with 6 users
- Connection: Working
- URL: Set in Vercel environment

### Test Accounts
```
Admin: admin@nexuserp.com / admin123
Supervisor: supervisor@nexuserp.com / user123
Operator 1: operator1@nexuserp.com / user123
Operator 2: operator2@nexuserp.com / user123
Client 1: client1@example.com / user123
Client 2: client2@example.com / user123
```

## 🔧 Troubleshooting

### Issue: "Invalid data format received"
**Cause**: JWT_SECRET not set in Vercel
**Solution**: Add JWT_SECRET environment variable (see above)

### Issue: "Unauthorized" or 401 errors
**Cause**: JWT_SECRET mismatch or not set
**Solution**: Verify JWT_SECRET matches exactly

### Issue: Data not persisting
**Cause**: Database connection or schema issue
**Solution**: Check Vercel logs, verify DATABASE_URL is set

### Issue: Pages crash on load
**Cause**: API returning error objects instead of arrays
**Solution**: Already fixed with array validation in code

## 📦 Deployed Files

All recent changes have been pushed to main branch:
- ✅ API fixes for array responses
- ✅ Error handling for all pages
- ✅ Phone field schema migration
- ✅ Client creation with user setup
- ✅ Lead/Product API fixes

Next deployment will include all fixes automatically!

## 🎯 Success Criteria

Deployment is successful when:
- [ ] Can login without errors
- [ ] All sidebar pages load correctly
- [ ] Can create clients, leads, properties
- [ ] Data persists after logout/login
- [ ] No console errors
- [ ] Drag-and-drop works for leads

## 🆘 Need Help?

If issues persist after adding JWT_SECRET:
1. Check Vercel deployment logs
2. Verify DATABASE_URL is set
3. Test API endpoints directly: `/api/auth/login`
4. Check browser console for specific errors
