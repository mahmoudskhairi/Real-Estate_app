# Complete Backend API Documentation

## 🔐 Authentication

All endpoints (except login) require authentication via JWT cookie.

### Base URL
- **Local**: `http://localhost:3000/api`
- **Production**: `https://your-app.vercel.app/api`

---

## 📋 API Endpoints

### Authentication

#### `POST /api/auth/login`
Login with email and password

**Request**:
```json
{
  "email": "admin@nexuserp.com",
  "password": "admin123"
}
```

**Response** (200):
```json
{
  "user": {
    "id": "user_id",
    "email": "admin@nexuserp.com",
    "role": "ADMIN",
    "name": "Admin User"
  }
}
```

**Errors**:
- `401`: Invalid credentials
- `500`: Server error

---

#### `POST /api/auth/logout`
Logout current user

**Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

---

#### `GET /api/auth/me`
Get current authenticated user

**Response** (200):
```json
{
  "user": {
    "id": "user_id",
    "email": "admin@nexuserp.com",
    "name": "Admin User",
    "role": "ADMIN",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Errors**:
- `401`: Not authenticated
- `404`: User not found

---

## 👥 Users API

### `GET /api/users`
List all users (ADMIN only)

**Response** (200):
```json
{
  "users": [
    {
      "id": "user_id",
      "email": "admin@nexuserp.com",
      "name": "Admin User",
      "role": "ADMIN",
      "createdAt": "2025-12-01T10:00:00.000Z",
      "updatedAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

**Access**: ADMIN only

---

### `POST /api/users`
Create new user (ADMIN only)

**Request**:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "role": "OPERATOR"
}
```

**Response** (201):
```json
{
  "user": {
    "id": "new_user_id",
    "email": "newuser@example.com",
    "name": "New User",
    "role": "OPERATOR",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Access**: ADMIN only

---

### `GET /api/users/[id]`
Get single user

**Response** (200):
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "OPERATOR",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Access**: All authenticated users

---

### `PATCH /api/users/[id]`
Update user (ADMIN or own account)

**Request**:
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "password": "newpassword",
  "role": "SUPERVISOR"
}
```

**Response** (200):
```json
{
  "user": {
    "id": "user_id",
    "email": "newemail@example.com",
    "name": "Updated Name",
    "role": "SUPERVISOR",
    "updatedAt": "2025-12-01T11:00:00.000Z"
  }
}
```

**Access**: ADMIN (all fields) or own account (name, email, password only)

---

### `DELETE /api/users/[id]`
Delete user (ADMIN only)

**Response** (200):
```json
{
  "message": "User deleted successfully"
}
```

**Access**: ADMIN only (cannot delete self)

---

## 📊 Leads API

### `GET /api/leads`
List leads

**Response** (200):
```json
{
  "leads": [
    {
      "id": "lead_id",
      "name": "Charlie Brown",
      "email": "charlie@example.com",
      "phone": "+1-555-0101",
      "status": "NEW",
      "operatorId": null,
      "operator": null,
      "products": [],
      "comments": [],
      "createdAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

**Access**:
- ADMIN/SUPERVISOR: All leads
- OPERATOR: Only assigned leads

---

### `POST /api/leads`
Create new lead

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-1234",
  "status": "NEW",
  "operatorId": "operator_id"
}
```

**Response** (201):
```json
{
  "lead": {
    "id": "new_lead_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-1234",
    "status": "NEW",
    "operatorId": "operator_id",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Access**: All authenticated users

---

### `GET /api/leads/[id]`
Get single lead

**Response** (200):
```json
{
  "lead": {
    "id": "lead_id",
    "name": "Charlie Brown",
    "email": "charlie@example.com",
    "phone": "+1-555-0101",
    "status": "NEW",
    "operator": {
      "id": "operator_id",
      "name": "Mike Chen",
      "email": "operator1@nexuserp.com"
    },
    "products": [],
    "comments": []
  }
}
```

**Access**: ADMIN/SUPERVISOR (all), OPERATOR (assigned only)

---

### `PATCH /api/leads/[id]`
Update lead

**Request**:
```json
{
  "name": "Updated Name",
  "status": "CONTACTED",
  "operatorId": "new_operator_id"
}
```

**Response** (200):
```json
{
  "lead": {
    "id": "lead_id",
    "name": "Updated Name",
    "status": "CONTACTED",
    "operatorId": "new_operator_id",
    "updatedAt": "2025-12-01T11:00:00.000Z"
  }
}
```

**Access**: ADMIN/SUPERVISOR (all fields), OPERATOR (assigned leads, limited fields)

---

### `DELETE /api/leads/[id]`
Delete lead

**Response** (200):
```json
{
  "message": "Lead deleted successfully"
}
```

**Access**: ADMIN/SUPERVISOR only

---

## 🏠 Products API

### `GET /api/products`
List all products

**Response** (200):
```json
{
  "products": [
    {
      "id": "product_id",
      "name": "Luxury Villa in Malibu",
      "type": "real_estate",
      "price": 12500000,
      "metadata": {
        "bedrooms": 6,
        "bathrooms": 7,
        "sqft": 8500,
        "location": "123 Ocean Drive, Malibu, CA 90265",
        "description": "Stunning oceanfront villa...",
        "images": ["url1", "url2"],
        "features": ["Ocean View", "Pool"]
      },
      "createdAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

**Access**: All authenticated users

---

### `POST /api/products`
Create new product

**Request**:
```json
{
  "name": "Beach House",
  "type": "real_estate",
  "price": 2500000,
  "metadata": {
    "bedrooms": 4,
    "bathrooms": 3,
    "sqft": 3000,
    "location": "456 Beach St, Miami, FL",
    "description": "Beautiful beach house",
    "features": ["Beach Access", "Pool"]
  }
}
```

**Response** (201):
```json
{
  "product": {
    "id": "new_product_id",
    "name": "Beach House",
    "type": "real_estate",
    "price": 2500000,
    "metadata": {...},
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Access**: ADMIN/SUPERVISOR only

---

### `GET /api/products/[id]`
Get single product

**Response** (200):
```json
{
  "product": {
    "id": "product_id",
    "name": "Luxury Villa in Malibu",
    "type": "real_estate",
    "price": 12500000,
    "metadata": {...}
  }
}
```

**Access**: All authenticated users

---

### `PATCH /api/products/[id]`
Update product

**Request**:
```json
{
  "name": "Updated Name",
  "price": 13000000,
  "metadata": {...}
}
```

**Response** (200):
```json
{
  "product": {
    "id": "product_id",
    "name": "Updated Name",
    "price": 13000000,
    "updatedAt": "2025-12-01T11:00:00.000Z"
  }
}
```

**Access**: ADMIN/SUPERVISOR only

---

### `DELETE /api/products/[id]`
Delete product

**Response** (200):
```json
{
  "message": "Product deleted successfully"
}
```

**Access**: ADMIN only

---

## 👤 Clients API

### `GET /api/clients`
List clients

**Response** (200):
```json
{
  "clients": [
    {
      "id": "client_id",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "Alice Johnson",
        "email": "client1@example.com"
      },
      "products": [],
      "claims": [],
      "createdAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

**Access**: ADMIN/SUPERVISOR/OPERATOR (all), CLIENT (self only)

---

### `POST /api/clients`
Create new client

**Request**:
```json
{
  "userId": "user_id"
}
```

**Response** (201):
```json
{
  "client": {
    "id": "new_client_id",
    "userId": "user_id",
    "user": {...},
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Access**: ADMIN only

---

### `GET /api/clients/[id]`
Get single client

**Response** (200):
```json
{
  "client": {
    "id": "client_id",
    "userId": "user_id",
    "user": {...},
    "products": [],
    "claims": []
  }
}
```

**Access**: ADMIN/SUPERVISOR/OPERATOR (all), CLIENT (self only)

---

### `DELETE /api/clients/[id]`
Delete client

**Response** (200):
```json
{
  "message": "Client deleted successfully"
}
```

**Access**: ADMIN only

---

## 📋 Claims API

### `GET /api/claims`
List claims

**Response** (200):
```json
{
  "claims": [
    {
      "id": "claim_id",
      "title": "Leaking Roof",
      "description": "There is a leak...",
      "status": "SUBMITTED",
      "clientId": "client_id",
      "operatorId": null,
      "client": {...},
      "operator": null,
      "comments": [],
      "attachments": [],
      "createdAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

**Access**:
- ADMIN/SUPERVISOR: All claims
- OPERATOR: Assigned claims only
- CLIENT: Own claims only

---

### `POST /api/claims`
Create new claim

**Request**:
```json
{
  "title": "Broken HVAC",
  "description": "The air conditioning is not working",
  "clientId": "client_id"
}
```

**Response** (201):
```json
{
  "claim": {
    "id": "new_claim_id",
    "title": "Broken HVAC",
    "description": "The air conditioning is not working",
    "status": "SUBMITTED",
    "clientId": "client_id",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

**Access**: All authenticated users (CLIENT must create for self)

---

### `GET /api/claims/[id]`
Get single claim

**Response** (200):
```json
{
  "claim": {
    "id": "claim_id",
    "title": "Leaking Roof",
    "description": "There is a leak...",
    "status": "SUBMITTED",
    "client": {...},
    "operator": {...},
    "comments": [],
    "attachments": []
  }
}
```

**Access**: ADMIN/SUPERVISOR (all), OPERATOR (assigned), CLIENT (own)

---

### `PATCH /api/claims/[id]`
Update claim

**Request**:
```json
{
  "title": "Updated Title",
  "status": "IN_REVIEW",
  "operatorId": "operator_id"
}
```

**Response** (200):
```json
{
  "claim": {
    "id": "claim_id",
    "title": "Updated Title",
    "status": "IN_REVIEW",
    "operatorId": "operator_id",
    "updatedAt": "2025-12-01T11:00:00.000Z"
  }
}
```

**Access**: 
- ADMIN/SUPERVISOR/OPERATOR: All fields
- CLIENT: Title and description only

---

### `DELETE /api/claims/[id]`
Delete claim

**Response** (200):
```json
{
  "message": "Claim deleted successfully"
}
```

**Access**: ADMIN/SUPERVISOR only

---

## 🔒 Role-Based Access Summary

| Endpoint | ADMIN | SUPERVISOR | OPERATOR | CLIENT |
|----------|-------|------------|----------|--------|
| **Users** |
| GET /api/users | ✅ All | ❌ | ❌ | ❌ |
| POST /api/users | ✅ | ❌ | ❌ | ❌ |
| PATCH /api/users/[id] | ✅ All | ✅ Self | ✅ Self | ✅ Self |
| DELETE /api/users/[id] | ✅ | ❌ | ❌ | ❌ |
| **Leads** |
| GET /api/leads | ✅ All | ✅ All | ✅ Assigned | ❌ |
| POST /api/leads | ✅ | ✅ | ✅ | ❌ |
| PATCH /api/leads/[id] | ✅ | ✅ | ✅ Assigned | ❌ |
| DELETE /api/leads/[id] | ✅ | ✅ | ❌ | ❌ |
| **Products** |
| GET /api/products | ✅ | ✅ | ✅ | ✅ |
| POST /api/products | ✅ | ✅ | ❌ | ❌ |
| PATCH /api/products/[id] | ✅ | ✅ | ❌ | ❌ |
| DELETE /api/products/[id] | ✅ | ❌ | ❌ | ❌ |
| **Clients** |
| GET /api/clients | ✅ All | ✅ All | ✅ All | ✅ Self |
| POST /api/clients | ✅ | ❌ | ❌ | ❌ |
| DELETE /api/clients/[id] | ✅ | ❌ | ❌ | ❌ |
| **Claims** |
| GET /api/claims | ✅ All | ✅ All | ✅ Assigned | ✅ Own |
| POST /api/claims | ✅ | ✅ | ✅ | ✅ |
| PATCH /api/claims/[id] | ✅ All | ✅ All | ✅ Assigned | ✅ Own (limited) |
| DELETE /api/claims/[id] | ✅ | ✅ | ❌ | ❌ |

---

## 🧪 Testing with cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nexuserp.com","password":"admin123"}' \
  -c cookies.txt

# Get current user (with cookies)
curl http://localhost:3000/api/auth/me \
  -b cookies.txt

# List users
curl http://localhost:3000/api/users \
  -b cookies.txt

# Create lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Test Lead","email":"test@example.com","phone":"+1-555-9999"}'
```

---

## 📝 Test Accounts

```
Admin:
  Email: admin@nexuserp.com
  Password: admin123

Supervisor:
  Email: supervisor@nexuserp.com
  Password: user123

Operator:
  Email: operator1@nexuserp.com
  Password: user123

Client:
  Email: client1@example.com
  Password: user123
```
