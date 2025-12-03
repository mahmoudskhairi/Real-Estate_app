# Fixing Neon Database Migration Issues

## Problem
Neon's connection pooler doesn't support advisory locks which Prisma migrations require.

Error: `Timed out trying to acquire a postgres advisory lock`

## Solution
Use two different connection strings in Vercel:

### 1. DATABASE_URL (Pooled - for queries)
```
postgresql://username:password@ep-xxx-pooler.us-east-1.aws.neon.tech:5432/dbname?sslmode=require
```
**Note:** Contains `-pooler` in the hostname

### 2. DIRECT_URL (Direct - for migrations)
```
postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech:5432/dbname?sslmode=require
```
**Note:** Does NOT contain `-pooler` in the hostname

## Steps to Fix on Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add/Update these variables:

   **DATABASE_URL** (Pooled connection)
   ```
   Your existing URL with -pooler
   ```

   **DIRECT_URL** (Direct connection - NEW)
   ```
   Same URL but remove -pooler from the hostname
   ```

4. Redeploy the application

## Finding Your Connection Strings in Neon

1. Go to your Neon project dashboard
2. Click on your database
3. In the connection details, you'll see:
   - **Pooled connection** - use this for DATABASE_URL
   - **Direct connection** - use this for DIRECT_URL

## Example

If your pooled URL is:
```
postgresql://user:pass@ep-sweet-math-ad3unyb9-pooler.c-2.us-east-1.aws.neon.tech:5432/neondb
```

Your direct URL should be:
```
postgresql://user:pass@ep-sweet-math-ad3unyb9.c-2.us-east-1.aws.neon.tech:5432/neondb
```

The only difference is removing `-pooler` from the hostname.

## Verification

After setting both environment variables and redeploying:
- Migrations will use DIRECT_URL (supports advisory locks)
- Application queries will use DATABASE_URL (benefits from connection pooling)
- Deployment should succeed without timeout errors
