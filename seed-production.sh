#!/bin/bash
# Script to seed production database
# Usage: ./seed-production.sh <DATABASE_URL>

if [ -z "$1" ]; then
  echo "❌ Error: DATABASE_URL is required"
  echo "Usage: ./seed-production.sh 'your-database-url'"
  exit 1
fi

DATABASE_URL=$1 npx tsx prisma/seed.ts
