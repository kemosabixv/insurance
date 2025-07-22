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
│   ├── server.js         # Express API server
│   └── __tests__/        # Backend unit tests
└── frontend/             # Next.js client (app router)
    ├── app/              # Dashboard, login pages
    ├── components/       # React components
    ├── lib/              # API + token management
    ├── __tests__/        # Frontend unit tests
    ├── globals.css       # Global styles
    └── jest.config.ts    # Jest config for frontend
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
cd frontend
npm install
```

**Run the dev server:**

```bash
npm run dev
```

> Runs at `http://localhost:3000`

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
- Runs both frontend and backend test suites.

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