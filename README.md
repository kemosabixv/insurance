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
│   ├── package.json        # NPM configuration file
│   ├── server.js           # Main Express API server
│   └── __tests__/          # Backend Jest unit tests
├── frontend/               # Next.js frontend (App Router)
│   ├── app/                # Application pages, API route handlers (dashboard, login, etc.)
│   │   ├── api/            # Next.js API route handlers (login, products, etc.)
│   │   ├── dashboard/      # Dashboard page
│   │   ├── login/          # Login page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable React components (Login, Navbar, ProductCard, etc.)
│   ├── lib/                # Auth context
│   ├── __tests__/          # Frontend Jest unit tests
│   ├── globals.css         # Global CSS styles
│   ├── jest.config.ts      # Jest configuration for frontend
│   ├── jest.setup.ts       # Jest setup for frontend
│   ├── next.config.ts      # Next.js configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── postcss.config.js   # PostCSS configuration
│   └── tsconfig.json       # TypeScript configuration
│   oauth/
│   ├── src/
│   │   ├── app.js          # Entry point of the application
│   │   ├── oauth/
│   │   │   ├── model.js    # Implements the OAuth 2.0 model methods
│   │   │   └── index.js    # Sets up the OAuth 2.0 server
│   │   ├── routes/
│   │   │   └── token.js     # Defines the token route for access tokens
│   │   └── config/
│   │       └── index.js     # Configuration settings
│   └── package.json         # NPM configuration file
        
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

### 3. Frontend Setup

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

### 4. OAuth Setup

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

### OAuth Setup

- **Main entry:**  
  `oauth/src/app.js`  
  Sets up the Express server and integrates the OAuth 2.0 server.

- **Token endpoint route:**  
  `oauth/src/routes/token.js`  
  Defines the `POST /oauth/token` endpoint for issuing access tokens.

- **OAuth model implementation:**  
  `oauth/src/oauth/model.js`  
  Implements the required OAuth 2.0 model methods (getClient, getUser, saveToken, etc.) for token issuance and validation.

**Request Body Example:**
```json
{
  "grant_type": "password",
  "client_id": "test_client",
  "client_secret": "test_secret",
  "username": "user1",
  "password": "pass1"
}
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

### Frontend Usage

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