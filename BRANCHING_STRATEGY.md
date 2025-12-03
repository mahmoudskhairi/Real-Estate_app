# Git Branching Strategy & Development Workflow

## 📋 Branch Structure

```
main (production)
├── develop (integration)
├── feature/admin-dashboard
├── feature/supervisor-dashboard
├── feature/operator-dashboard
└── feature/client-portal
```

## 🎯 Development Workflow by Role

### Phase 1: Admin Features (`feature/admin-dashboard`)
**Timeline**: Sprint 1-2

**Features**:
- User management (CRUD)
- System settings
- Analytics dashboard
- Product management
- Full system oversight

**API Endpoints Used**:
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PATCH /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PATCH /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Phase 2: Supervisor Features (`feature/supervisor-dashboard`)
**Timeline**: Sprint 3-4

**Features**:
- Lead management overview
- Operator assignment
- Claims review and approval
- Team performance analytics

**API Endpoints Used**:
- `POST /api/auth/login`
- `GET /api/leads` - View all leads
- `POST /api/leads` - Create leads
- `PATCH /api/leads/[id]` - Assign to operators
- `GET /api/claims` - View all claims
- `PATCH /api/claims/[id]` - Update claim status
- `GET /api/products` - View products
- `POST /api/products` - Add new products

### Phase 3: Operator Features (`feature/operator-dashboard`)
**Timeline**: Sprint 5-6

**Features**:
- Personal leads dashboard (Kanban)
- Lead status updates
- Assigned claims management
- Client communication

**API Endpoints Used**:
- `POST /api/auth/login`
- `GET /api/leads` - View assigned leads only
- `PATCH /api/leads/[id]` - Update lead status
- `GET /api/claims` - View assigned claims
- `PATCH /api/claims/[id]` - Update claim details
- `GET /api/products` - View product catalog

### Phase 4: Client Portal (`feature/client-portal`)
**Timeline**: Sprint 7-8

**Features**:
- Personal dashboard
- Owned products view
- Claims submission and tracking
- Document uploads

**API Endpoints Used**:
- `POST /api/auth/login`
- `GET /api/clients` - View own profile
- `GET /api/claims` - View own claims
- `POST /api/claims` - Submit new claim
- `GET /api/products` - View purchased products

---

## 🔀 Git Commands for Each Phase

### Starting a New Feature Branch

```bash
# Phase 1: Admin Dashboard
git checkout main
git pull origin main
git checkout -b feature/admin-dashboard

# Phase 2: Supervisor Dashboard
git checkout main
git pull origin main
git checkout -b feature/supervisor-dashboard

# Phase 3: Operator Dashboard
git checkout main
git pull origin main
git checkout -b feature/operator-dashboard

# Phase 4: Client Portal
git checkout main
git pull origin main
git checkout -b feature/client-portal
```

### Working on Your Branch

```bash
# Make changes
git add .
git commit -m "feat(admin): add user management page"

# Push to remote
git push origin feature/admin-dashboard

# Keep branch updated with main
git checkout main
git pull origin main
git checkout feature/admin-dashboard
git merge main
```

### Completing a Feature

```bash
# Ensure branch is up to date
git checkout feature/admin-dashboard
git pull origin main
git merge main

# Push final changes
git push origin feature/admin-dashboard

# Create Pull Request on GitHub
# After PR approval and merge to main:
git checkout main
git pull origin main
git branch -d feature/admin-dashboard  # Delete local branch
```

---

## 📝 Commit Message Convention

```bash
feat(admin): add user creation form
fix(supervisor): correct lead assignment bug
style(operator): improve kanban card design
refactor(client): optimize claims API calls
docs: update API documentation
test(admin): add user CRUD tests
chore: update dependencies
```

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, UI changes
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

---

## 🚀 Deployment Strategy

### Development Flow:
1. **Feature Branch** → Local testing
2. **Pull Request** → Code review
3. **Main Branch** → Auto-deploy to Vercel

### Testing Checklist Before Merge:
- [ ] All API endpoints tested
- [ ] Authentication working
- [ ] Role-based access verified
- [ ] UI responsive on mobile
- [ ] No console errors
- [ ] Database operations successful

---

## 👥 Team Roles & Responsibilities

| Role | Branch | Responsibilities |
|------|--------|------------------|
| **Lead Developer** | `main` | Code review, merges, deployments |
| **Backend Dev** | All features | API endpoints, database |
| **Frontend Dev 1** | `feature/admin-dashboard` | Admin UI |
| **Frontend Dev 2** | `feature/supervisor-dashboard` | Supervisor UI |
| **Frontend Dev 3** | `feature/operator-dashboard` | Operator UI |
| **Frontend Dev 4** | `feature/client-portal` | Client UI |

---

## 🔧 Quick Reference Commands

```bash
# Check current branch
git branch

# Switch branches
git checkout feature/admin-dashboard

# View branch differences
git diff main feature/admin-dashboard

# List all branches
git branch -a

# Delete merged branch
git branch -d feature/admin-dashboard

# Force delete unmerged branch
git branch -D feature/admin-dashboard

# Stash changes before switching
git stash
git checkout other-branch
git stash pop
```

---

## 🎯 Success Criteria

### Phase 1 Complete (Admin):
- ✅ User CRUD functional
- ✅ Product CRUD functional
- ✅ Dashboard with statistics
- ✅ All tests passing

### Phase 2 Complete (Supervisor):
- ✅ Lead overview working
- ✅ Operator assignment functional
- ✅ Claims review system
- ✅ Analytics dashboard

### Phase 3 Complete (Operator):
- ✅ Kanban board functional
- ✅ Drag & drop working
- ✅ Lead updates in real-time
- ✅ Claim management

### Phase 4 Complete (Client):
- ✅ Personal dashboard
- ✅ Claims submission
- ✅ Product viewing
- ✅ Document uploads

---

## 📞 Support

For questions about branching or workflow:
1. Check this document
2. Review existing PR examples
3. Ask lead developer
4. GitHub Discussions tab
