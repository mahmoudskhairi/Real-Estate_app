#!/bin/bash

# Permanent solution for Neon database deployment
# This script handles connection issues and uses db push instead of migrate

set -e

echo "🔄 Starting database deployment..."

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

# Wait for database to be ready (Neon wake-up time)
echo "⏳ Waiting for database to be ready..."
sleep 3

# Use db push instead of migrate deploy to avoid advisory lock issues
echo "🚀 Pushing database schema..."
npx prisma db push --skip-generate --accept-data-loss

echo "✅ Database deployment completed successfully!"
