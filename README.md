# 🛡️ Insurance Product Application

A full-stack insurance product management app built with:

- **Frontend**: Next.js (TypeScript)
- **Backend**: Express.js + better-sqlite3 (in-memory SQLite DB)
- **Auth**: OAuth 2.0 Resource Owner Password Credentials Grant

---

## 📦 Project Structure

```
insurance/
├── backend/              # Express + SQLite + OAuth
│   ├── db.js             # In-memory SQLite DB setup
│   ├── oauth.js          # OAuth token handler
│   └── server.js         # Express API server
└── frontend/             # Next.js client (app router)
    ├── app/              # Dashboard, login pages
    └── lib/              # API + token management
```

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
touch .env
```

**`.env`**

```env
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

**Start server in dev mode:**

```bash
npm run start:dev
```

> Runs at `http://localhost:4000`

---

### 2. Frontend Setup

```bash
cd ./
npm install
```

**Run the dev server:**

```bash
npm run dev
```

> Runs at `http://localhost:3000`

---

## 🔐 OAuth 2.0 Configuration

Using **Resource Owner Password Credentials** grant type.

### ✅ Client Credentials
```json
{
  "client_id": "test_client",
  "client_secret": "test_secret"
}
```

### ✅ User Credentials
```json
{
  "username": "user1",
  "password": "pass1"
}
```

### 🧪 Sample Token Request

```http
POST /oauth/token HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{
  "grant_type": "password",
  "client_id": "test_client",
  "client_secret": "test_secret",
  "username": "user1",
  "password": "pass1"
}
```

**✅ Sample Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

## 📡 API Endpoints

### 🔒 `POST /oauth/token`
> Issues a JWT access token using username/password + client credentials.

---

### 🔐 `GET /api/products`
> Returns a list of available insurance products. Requires a Bearer token.

**Request:**

```http
GET /api/products HTTP/1.1
Authorization: Bearer <access_token>
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Health Insurance",
    "type": "Health",
    "coverage": "Medical coverage up to $50,000",
    "price": 199.99
  },
  ...
]
```

---

## 📌 Notes

- The backend uses an **in-memory SQLite DB**, which resets on every restart.
- Seeded data includes 3 insurance products.

---

## 🧹 Cleanup

Press `CTRL+C` in terminal to stop the backend server. In-memory database and seeded data will be destroyed automatically.

---
