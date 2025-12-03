#!/bin/bash

# Test API Script for Real Estate ERP
echo "🧪 Testing Real Estate ERP API"
echo "================================"

# First login to get the cookie
echo ""
echo "1️⃣ Testing Login..."
curl -s -c /tmp/cookies.txt -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nexuserp.com","password":"admin123"}' | jq '.'

echo ""
echo "2️⃣ Testing GET /api/leads..."
curl -s -b /tmp/cookies.txt http://localhost:3000/api/leads | jq '. | length' | xargs echo "Total leads:"

echo ""
echo "3️⃣ Testing GET /api/clients..."
curl -s -b /tmp/cookies.txt http://localhost:3000/api/clients | jq '. | length' | xargs echo "Total clients:"

echo ""
echo "4️⃣ Testing GET /api/products..."
curl -s -b /tmp/cookies.txt http://localhost:3000/api/products | jq '. | length' | xargs echo "Total products:"

echo ""
echo "5️⃣ Creating a test lead..."
curl -s -b /tmp/cookies.txt -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Lead",
    "description": "Test phone number",
    "contactName": "Test Person",
    "contactEmail": "test@example.com",
    "status": "NEW"
  }' | jq '.'

echo ""
echo "6️⃣ Checking leads again..."
curl -s -b /tmp/cookies.txt http://localhost:3000/api/leads | jq '. | length' | xargs echo "Total leads after creation:"

echo ""
echo "✅ Tests complete!"
rm /tmp/cookies.txt
