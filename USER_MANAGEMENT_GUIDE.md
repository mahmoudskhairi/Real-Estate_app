## User Management Access Guide

### How to Access User Management:

1. **Login as Admin:**
   - Email: `admin@nexuserp.com`
   - Password: `admin123`

2. **Navigate to Users:**
   - Look for "Users" menu item in the left sidebar (with UserPlus icon)
   - Click on it to access `/users` route

3. **Create New Users:**
   - Click the "Add User" button (+ icon)
   - Fill out the form:
     - **Name:** Full name of the user
     - **Email:** Valid email address
     - **Phone:** Optional phone number with validation
     - **Password:** Minimum 6 characters
     - **Role:** Select from available roles based on your permissions

### Role-Based Access:

**ADMIN** (admin@nexuserp.com):
- ✅ Can see Users menu
- ✅ Can create: SUPERVISOR, OPERATOR, CLIENT
- ✅ Can delete users
- ✅ Can see all users

**SUPERVISOR** (supervisor@nexuserp.com / password: user123):
- ✅ Can see Users menu  
- ✅ Can create: OPERATOR, CLIENT
- ❌ Cannot create: ADMIN, SUPERVISOR
- ❌ Cannot delete users
- ✅ Can see OPERATOR and CLIENT users only

**OPERATOR** (operator1@nexuserp.com / password: user123):
- ✅ Can see Users menu
- ✅ Can create: CLIENT only
- ❌ Cannot create: ADMIN, SUPERVISOR, OPERATOR
- ❌ Cannot delete users
- ✅ Can see CLIENT users only

**CLIENT** (client1@example.com / password: user123):
- ❌ Cannot see Users menu
- ❌ No access to user management
- ✅ Can only access Claims and Settings

### Testing the Feature:

1. Login as admin
2. Check if "Users" appears in sidebar
3. Click on Users to go to user management page
4. Try creating different role types
5. Verify role-based restrictions work properly