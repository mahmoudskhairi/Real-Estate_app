# Deployment Instructions for Vercel

## 1. Setup Database

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel Dashboard
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database** → **Postgres**
5. Vercel will auto-set `POSTGRES_URL` environment variable

### Option B: External Provider (Neon/Supabase)
1. Sign up at [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Create a new PostgreSQL database
3. Copy the connection string

## 2. Configure Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following:

```
DATABASE_URL=<your-postgresql-connection-string>
JWT_SECRET=<generate-using-command-below>
NODE_ENV=production
```

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

## 3. Push Schema to Production Database

**Local machine (with production DATABASE_URL):**
```bash
# Set production database URL temporarily
DATABASE_URL="your-production-db-url" npx prisma db push

# Seed production database
DATABASE_URL="your-production-db-url" npx tsx prisma/seed.ts
```

## 4. Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

## 5. Verify Deployment

1. Visit your Vercel app URL
2. Try logging in with: `admin@nexuserp.com` / `admin123`
3. Check Vercel Function logs for any errors

## Alternative: Use Vercel Build Script

Add to `package.json`:
```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma db push && next build"
  }
}
```

This will run migrations automatically on each deployment.
