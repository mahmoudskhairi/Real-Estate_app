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

4. **Copy Database Connection String:**
   - After creation, you'll see a connection string like:
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   - **Save this!** You'll need it for Vercel

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
   Click "Environment Variables" and add:

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Neon connection string from Step 1 |
   | `JWT_SECRET` | Generate a random string (e.g., `openssl rand -base64 32`) |

   To generate JWT_SECRET in terminal:
   ```bash
   openssl rand -base64 32
   ```

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

## Step 3: Run Database Migrations

After successful deployment, you need to run migrations:

### Method 1: Using Vercel CLI (Recommended)

1. **Pull environment variables:**
   ```bash
   vercel env pull .env.production
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Method 2: Using Neon SQL Editor

1. Go to your Neon project dashboard
2. Click "SQL Editor"
3. Copy and paste your migration SQL from `prisma/migrations/*/migration.sql`
4. Execute the SQL

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

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Neon | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secret key for JWT tokens | Random 32+ character string |
| `NODE_ENV` | Environment (auto-set by Vercel) | `production` |

---

## Troubleshooting

### Build Fails - Prisma Error

**Solution:** Make sure `postinstall` script is in package.json:
```json
"postinstall": "prisma generate"
```

### Database Connection Error

**Solutions:**
1. Verify `DATABASE_URL` has `?sslmode=require` at the end
2. Check Neon database is active (not suspended)
3. Verify environment variable is set in Vercel

### API Routes Return 500

**Solutions:**
1. Check Vercel function logs (Vercel Dashboard → Deployments → View Function Logs)
2. Verify all environment variables are set
3. Ensure migrations are deployed

### Migration Issues

**Solution:** Run migrations manually:
```bash
vercel env pull
npx prisma migrate deploy
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
