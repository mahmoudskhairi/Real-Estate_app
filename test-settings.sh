#!/bin/bash

echo "🧪 Testing Settings Persistence..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000/api"

# Test credentials
EMAIL="admin@nexuserp.com"
PASSWORD="admin123"

echo -e "${BLUE}1. Login to get token${NC}"
LOGIN_RESPONSE=$(curl -s -c cookies.txt -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

if echo "$LOGIN_RESPONSE" | grep -q "user"; then
  echo -e "${GREEN}✓ Login successful${NC}"
  USER_ID=$(echo "$LOGIN_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo "  User ID: $USER_ID"
else
  echo -e "${RED}✗ Login failed${NC}"
  echo "$LOGIN_RESPONSE"
  exit 1
fi

echo ""
echo -e "${BLUE}2. Get current user settings${NC}"
ME_RESPONSE=$(curl -s -b cookies.txt "$BASE_URL/auth/me")
echo "$ME_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$ME_RESPONSE"

echo ""
echo -e "${BLUE}3. Update theme to light${NC}"
THEME_UPDATE=$(curl -s -b cookies.txt -X PATCH "$BASE_URL/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{"theme":"light"}')

if echo "$THEME_UPDATE" | grep -q "light"; then
  echo -e "${GREEN}✓ Theme updated to light${NC}"
else
  echo -e "${RED}✗ Theme update failed${NC}"
  echo "$THEME_UPDATE"
fi

echo ""
echo -e "${BLUE}4. Update notification preferences${NC}"
NOTIF_UPDATE=$(curl -s -b cookies.txt -X PATCH "$BASE_URL/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{"emailNotifications":false,"pushNotifications":true,"smsNotifications":false}')

if echo "$NOTIF_UPDATE" | grep -q "emailNotifications"; then
  echo -e "${GREEN}✓ Notification preferences updated${NC}"
else
  echo -e "${RED}✗ Notification update failed${NC}"
  echo "$NOTIF_UPDATE"
fi

echo ""
echo -e "${BLUE}5. Verify settings persisted (logout and login again)${NC}"
curl -s -b cookies.txt -X POST "$BASE_URL/auth/logout" > /dev/null
echo "  Logged out"

sleep 1

LOGIN_RESPONSE2=$(curl -s -c cookies.txt -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

if echo "$LOGIN_RESPONSE2" | grep -q "light"; then
  echo -e "${GREEN}✓ Theme persisted after logout/login${NC}"
else
  echo -e "${RED}✗ Theme did not persist${NC}"
fi

echo ""
echo -e "${BLUE}6. Get final user settings${NC}"
FINAL_ME=$(curl -s -b cookies.txt "$BASE_URL/auth/me")
echo "$FINAL_ME" | python3 -m json.tool 2>/dev/null || echo "$FINAL_ME"

# Cleanup
rm -f cookies.txt

echo ""
echo -e "${GREEN}✅ Testing complete!${NC}"
