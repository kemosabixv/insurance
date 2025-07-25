require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { db, seedProducts } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
    console.log("Received token:", token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log("JWT verification result:", err, user);
    console.log("JWT secret used:", JWT_SECRET);
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Protected products endpoint
app.get("/api/products", authenticate, (req, res) => {
  const stmt = db.prepare("SELECT * FROM products");
  const products = stmt.all();
  res.json(products);
});

// Start server
seedProducts();
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`),
);
