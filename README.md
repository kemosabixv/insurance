# 🛡️ Insurance Product Application

A full-stack insurance product management app built with:

- **Frontend**: Next.js (TypeScript)
- **Backend**: Express.js + better-sqlite3 (in-memory SQLite DB)
- **Auth**: OAuth 2.0 Resource Owner Password Credentials Grant

---

## 📦 Project Structure

```
insurance/
├── backend/                # Express.js backend with SQLite and OAuth
│   ├── db.js               # Sets up in-memory SQLite database
│   ├── oauth/              # OAuth 2.0 logic and middleware
│   │   ├── index.js        # Main OAuth logic
│   │   └── utils.js        # OAuth helper functions
│   ├── oauth.js            # Handles OAuth 2.0 token logic (legacy entry point)
│   ├── server.js           # Main Express API server
│   └── __tests__/          # Backend Jest unit tests
├── frontend/               # Next.js frontend (App Router)
│   ├── app/                # Application pages (dashboard, login, etc.)
│   ├── components/         # Reusable React components
│   ├── lib/                # API utilities and token management
│   ├── __tests__/          # Frontend Jest unit tests
│   ├── globals.css         # Global CSS styles
│   └── jest.config.ts      # Jest configuration for frontend
├── oauth2-server-app/      # Standalone OAuth 2.0 server (optional, for advanced scenarios)
│   ├── src/                # Source code for OAuth2 server
│   │   ├── config           # Main OAuth logic
│   │   ├── oauth           # OAuth helper functions
│   │   └── routes          # OAuth helper functions
        
```

---

## ⚙️ Setup Instructions

### 1. Clone

```bash
git clone https://github.com/kemosabixv/insurance
```

### 2. Backend Setup

```bash
cd backend
npm install
touch .env
```

**`.env`**

```env
JWT_SECRET=supersecretkey
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
cd frontend
npm install
```

**Run the dev server:**

```bash
npm run dev
```

> Runs at `http://localhost:3000`

---

### 2. OAuth Setup

```bash
cd oauth
npm install
touch .env
```

**`.env`**

```env
JWT_SECRET=supersecretkey
PORT=4001
```

**Start server in dev mode:**

```bash
npm run start:dev
```

> Runs at `http://localhost:4001`

---


## 🧪 Running Tests

### Frontend Unit Tests

```bash
npm run test:frontend
```
- Runs Jest tests in `frontend/components/__tests__/` and other test folders.
- **Covers:** UI rendering, error states, button logic, and component props.

### Backend Unit Tests

```bash
npm run test:backend
```
- Runs Jest tests in `backend/__tests__/`.
- **Covers:** OAuth token issuance, authentication, authorization, and API endpoint logic.

### Run All Tests

```bash
npm run test
```
- Runs both frontend and backend test suites from frontend or backend root.

---

## 🔑 OAuth Configuration

This project uses **OAuth 2.0 Resource Owner Password Credentials Grant** for authentication.

### Backend OAuth Setup

- **Endpoint:**  
  `POST /oauth/token`

- **Request Body Example:**
  ```json
  {
    "grant_type": "password",
    "client_id": "test_client",
    "client_secret": "test_secret",
    "username": "user1",
    "password": "pass1"
  }
  ```

- **Environment Variables (`backend/.env`):**
  ```env
  JWT_SECRET=supersecretkey
  PORT=4000
  ```

- **Default Credentials (for testing):**
  - `client_id`: `test_client`
  - `client_secret`: `test_secret`
  - `username`: `user1`
  - `password`: `pass1`

- **Token Response Example:**
  ```json
  {
    "access_token": "<JWT>",
    "token_type": "Bearer",
    "expires_in": 3600
  }
  ```

- **Error Responses:**
  - Invalid credentials:  
    `401 Unauthorized`  
    ```json
    { "error": "invalid_credentials" }
    ```
  - Invalid client or malformed request:  
    `400 Bad Request`  
    ```json
    { "error": "invalid_client" }
    ```

### Frontend Usage (Updated)

- The frontend authenticates by POSTing to `/api/login` (a Next.js route handler), which proxies to the backend OAuth server and sets the JWT as an **HTTP-only cookie** (`access_token`).
- The frontend **does not store tokens in localStorage**.
- All protected API requests from the frontend are made to Next.js API route handlers (e.g. `/api/products`), which:
  - Read the `access_token` from the HTTP-only cookie (using the Next.js cookies API).
  - Forward the request to the backend, attaching the token in the `Authorization` header:
    ```
    Authorization: Bearer <access_token>
    ```
- The `/api/me` route handler reads the `access_token` cookie and returns `{ token }` for frontend authentication state checks.
- The React AuthContext uses `/api/me` to determine login state and update UI accordingly.

**Summary of the flow:**
1. User logs in via the frontend login form.
2. Frontend POSTs credentials to `/api/login`.
3. `/api/login` proxies to the backend OAuth server, receives the JWT, and sets it as an HTTP-only cookie.
4. AuthContext checks `/api/me` to determine if the user is logged in.
5. Protected frontend pages call `/api/products`, which proxies to the backend with the token.

---

## 🧪 Unit Test Coverage

- **Backend:**  
  - Validates OAuth token issuance and rejection for invalid credentials.
  - Checks protected API endpoints for correct authentication and authorization.
  - Handles edge cases (expired tokens, malformed requests).

- **Frontend:**  
  - Ensures login form renders and handles user input.
  - Verifies error messages for invalid credentials and network failures.
  - Tests button disabled/enabled states during async actions.
  - Covers UI logic for logged-in vs. logged-out states.

---

## 📌 Notes

- The backend uses an **in-memory SQLite DB**, which resets on every restart.
- Seeded data includes 3 insurance products.

---

## 🧹 Cleanup

Press `CTRL+C` in terminal to stop the backend server. In-memory database and seeded data will