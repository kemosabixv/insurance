const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect();

const products = [
  {
    id: "prod_001",
    name: "Premium Health Plan",
    type: "HEALTH",
    coverage: "Full medical + dental",
    price: 200.00
  },
  {
    id: "prod_002",
    name: "Basic Auto Plan",
    type: "AUTO",
    coverage: "Collision + liability",
    price: 120.00
  }
];

async function seedProducts() {
  for (const product of products) {
    await client.set(product.id, JSON.stringify(product));
  }
  console.log("Products seeded to Redis.");
}

module.exports = { client, seedProducts };
