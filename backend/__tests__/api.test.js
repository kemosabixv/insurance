const request = require('supertest');
const express = require('express');
const { db, seedProducts } = require('../db');
const { tokenHandler } = require('../oauth');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
app.use(express.json());
app.post('/oauth/token', tokenHandler);

const USER = { username: 'user1', password: 'pass1' };
const CLIENT = { id: 'test_client', secret: 'test_secret' };

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
});
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

beforeAll(() => seedProducts());

describe('OAuth and /api/products', () => {
  let token;

  test('should return access token with correct credentials', async () => {
    const res = await request(app).post('/oauth/token').send({
      grant_type: 'password',
      client_id: CLIENT.id,
      client_secret: CLIENT.secret,
      username: USER.username,
      password: USER.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.access_token).toBeDefined();
    token = res.body.access_token;
  });

  test('should fetch products with valid token', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
