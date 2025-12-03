# Deployment Guide - Vercel + Neon

This guide will help you deploy your Real Estate app to Vercel with a free PostgreSQL database from Neon.

## Prerequisites

- GitHub account (you already have this ✓)
- Vercel account (free)
- Neon account (free)

---

## Step 1: Setup Neon Database (Free PostgreSQL)

1. **Go to [neon.tech](https://neon.tech)**

2. **Sign up/Login** with GitHub

3. **Create a New Project:**
   - Click "Create a project"
   - Name: `real-estate-db`
   - Region: Choose closest to you (US East recommended)
   - PostgreSQL version: 16 (latest)
   - Click "Create project"

4. **Copy Database Connection Strings:**
   - After creation, you'll see TWO connection strings:
   
   **Pooled Connection (for DATABASE_URL):**
   ```
   postgresql://username:password@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?pgbouncer=true
   ```
   
   **Direct Connection (for DIRECT_URL):**
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb
   ```
   - **Save BOTH!** You'll need them for Vercel
   - The pooled URL has `-pooler` in the hostname
   - The direct URL doesn't have `-pooler`

---

## Step 2: Deploy to Vercel

### Option A: Using Vercel Website (Easiest)

1. **Go to [vercel.com](https://vercel.com)**

2. **Sign up/Login** with your GitHub account

3. **Import Project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `Real-Estate_app`
   - Click "Import"

4. **Configure Project:**
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `./` (leave as is)
   - Build Command: Leave default or use: `prisma generate && next build`
   - Output Directory: Leave default (`.next`)

5. **Environment Variables:**
   Click "Environment Variables" and add these THREE variables:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Neon **POOLED** connection string (with `-pooler`) |
   | `DIRECT_URL` | Your Neon **DIRECT** connection string (without `-pooler`) |
   | `JWT_SECRET` | Generate a random string (see below) |

   To generate JWT_SECRET in terminal:
   ```bash
   openssl rand -base64 32
   ```
   
   **Important:** The `DIRECT_URL` is required to avoid deployment timeout errors!

6. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://your-app-name.vercel.app`

---

### Option B: Using Vercel CLI (Alternative)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /path/to/Rea-Estate_app
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `real-estate-app`
   - In which directory is your code located? `./`
   - Auto-detected Next.js: **Y**
   - Override settings? **N**

5. **Add Environment Variables:**
   ```bash
   vercel env add DATABASE_URL
   # Paste your Neon connection string
   
   vercel env add JWT_SECRET
   # Paste your generated secret
   ```

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## Step 3: Database Schema Deployment

**Good news!** The database schema is automatically deployed during the build process using `prisma db push`.

This happens automatically because:
- Build command includes `prisma db push`
- Uses `DIRECT_URL` to avoid connection timeouts
- No manual migration steps needed!

### Manual Schema Update (if needed)

If you need to manually update the schema:

```bash
# Set environment variables
export DATABASE_URL="your-pooled-url"
export DIRECT_URL="your-direct-url"

# Push schema changes
npx prisma db push
```

---

## Step 4: Verify Deployment

1. **Visit your deployed app:**
   - URL will be shown in Vercel dashboard or CLI output
   - Example: `https://real-estate-app-xyz.vercel.app`

2. **Test the application:**
   - Try to access login page
   - Check if API routes work
   - Test database connection

---

## Auto-Deploy Setup

Vercel automatically deploys when you push to GitHub:

1. **Push changes to GitHub:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

2. **Vercel auto-builds:**
   - Every push to `main` triggers deployment
   - Preview deployments for other branches

---

## Environment Variables Reference

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | Neon pooled connection (for app queries) | `postgresql://user:pass@host-pooler/db?pgbouncer=true` | ✅ Yes |
| `DIRECT_URL` | Neon direct connection (for schema operations) | `postgresql://user:pass@host/db` | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Random 32+ character string | ✅ Yes |
| `NODE_ENV` | Environment (auto-set by Vercel) | `production` | Auto-set |

---

## Troubleshooting

### ❌ Error P1002: Advisory Lock Timeout

**Problem:** Build fails with "Timed out trying to acquire a postgres advisory lock"

**Solution:** ✅ This is FIXED in the current configuration!
- We use `prisma db push` instead of `prisma migrate deploy`
- No advisory locks needed
- Works with Neon's connection pooler

If you still see this error:
1. Verify you have `DIRECT_URL` set in Vercel environment variables
2. Make sure `DIRECT_URL` is the direct connection (WITHOUT `-pooler`)
3. Check `prisma/schema.prisma` has `directUrl = env("DIRECT_URL")`

### Build Fails - Prisma Error

**Solution:** Make sure `postinstall` script is in package.json:
```json
"postinstall": "prisma generate"
```

### Database Connection Error

**Solutions:**
1. Verify both `DATABASE_URL` and `DIRECT_URL` are set
2. Check Neon database is active (not suspended)
3. Verify environment variables are set correctly in Vercel
4. `DATABASE_URL` should have `-pooler` in hostname
5. `DIRECT_URL` should NOT have `-pooler` in hostname

### API Routes Return 500

**Solutions:**
1. Check Vercel function logs (Vercel Dashboard → Deployments → View Function Logs)
2. Verify all THREE environment variables are set (`DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`)
3. Check database connection is working

### Database Schema Not Updated

**Solution:** Schema updates automatically during deployment. If needed manually:
```bash
# Use DIRECT_URL for schema operations
export DATABASE_URL="your-direct-url"
npx prisma db push
```

---

## Custom Domain (Optional)

1. **Buy a domain** (or use existing)
2. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain
   - Follow DNS configuration instructions
3. **Wait for DNS propagation** (5-60 minutes)

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# View environment variables
vercel env ls

# Pull environment variables locally
vercel env pull

# Deploy to production
vercel --prod
```

---

## Free Tier Limits

### Vercel Free Tier:
- ✓ Unlimited projects
- ✓ 100GB bandwidth/month
- ✓ Automatic HTTPS
- ✓ Automatic deployments
- ✓ Preview deployments

### Neon Free Tier:
- ✓ 0.5GB storage
- ✓ Unlimited compute hours
- ✓ 1 project
- ✓ Auto-suspend after inactivity

---

## Next Steps

- [ ] Deploy to Vercel
- [ ] Setup Neon database
- [ ] Run migrations
- [ ] Test application
- [ ] (Optional) Add custom domain
- [ ] (Optional) Setup monitoring with Vercel Analytics

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Prisma Docs:** https://www.prisma.io/docs

---

**Your app is now ready for deployment! 🚀**
