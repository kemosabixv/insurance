const request = require("supertest");
const express = require("express");
const { db, seedProducts } = require("../db");
const { tokenHandler } = require("../oauth");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(express.json());
app.post("/oauth/token", tokenHandler);

const USER = { username: "user1", password: "pass1" };
const CLIENT = { id: "test_client", secret: "test_secret" };

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
});
app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

beforeAll(() => seedProducts());

describe("OAuth and /api/products", () => {
  let token;

  test("should return access token with correct credentials", async () => {
    const res = await request(app).post("/oauth/token").send({
      grant_type: "password",
      client_id: CLIENT.id,
      client_secret: CLIENT.secret,
      username: USER.username,
      password: USER.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.access_token).toBeDefined();
    token = res.body.access_token;
  });

  test("should fetch products with valid token", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Edge case: Invalid user credentials
  test("should not issue token with invalid user credentials", async () => {
    const res = await request(app).post("/oauth/token").send({
      grant_type: "password",
      client_id: CLIENT.id,
      client_secret: CLIENT.secret,
      username: "wronguser",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.access_token).toBeUndefined();
  });

  // Edge case: Invalid client credentials
  test("should not issue token with invalid client credentials", async () => {
    const res = await request(app).post("/oauth/token").send({
      grant_type: "password",
      client_id: "bad_client",
      client_secret: "bad_secret",
      username: USER.username,
      password: USER.password,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.access_token).toBeUndefined();
  });

  // Edge case: Missing token when accessing products
  test("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(401);
  });

  // Edge case: Invalid token when accessing products
  test("should return 403 if token is invalid", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.statusCode).toBe(403);
  });

  // Edge case: Expired token when accessing products
  test("should return 403 if token is expired", async () => {
    // Create an expired token
    const expiredToken = jwt.sign(
      { username: USER.username },
      process.env.JWT_SECRET,
      { expiresIn: -10 }, // expired 10 seconds ago
    );
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${expiredToken}`);
    expect(res.statusCode).toBe(403);
  });
});
