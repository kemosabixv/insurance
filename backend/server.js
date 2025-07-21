require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { tokenHandler } = require('./oauth');
const { client, seedProducts } = require('./redis/products');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// OAuth token endpoint
app.post('/oauth/token', tokenHandler);

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected products endpoint
app.get('/api/products', authenticate, async (req, res) => {
  const keys = await client.keys('*');
  const values = await Promise.all(keys.map(key => client.get(key)));
  const products = values.map(val => JSON.parse(val));
  res.json(products);
});

// Start server
seedProducts().then(() => {
  app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
});
