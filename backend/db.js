const Database = require("better-sqlite3");
const db = new Database(":memory:");

db.pragma("journal_mode = WAL"); // Use Write-Ahead Logging for better concurrency
db.pragma("cache_size = 10000"); // Set cache size to improve performance
db.pragma("synchronous = NORMAL"); // Set synchronous mode to NORMAL for better performance
db.pragma("temp_store = MEMORY"); // Use memory for temporary tables
db.pragma('encoding = "UTF-8"'); // Ensure UTF-8 encoding for text data
db.pragma("auto_vacuum = FULL"); // Enable auto-vacuum to reclaim space automatically

// Create table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT,
    coverage TEXT,
    price REAL
  )
`,
).run();

// Seed sample products
function seedProducts() {
  const count = db
    .prepare("SELECT COUNT(*) AS count FROM products")
    .get().count;
  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO products (name, type, coverage, price) VALUES (?, ?, ?, ?)",
    );
    insert.run(
      "Health Insurance",
      "Health",
      "Medical coverage up to $50,000",
      199.99,
    );
    insert.run(
      "Car Insurance",
      "Automobile",
      "Covers accidents and theft",
      299.99,
    );
    insert.run(
      "Travel Insurance",
      "Travel",
      "Emergency and cancellation coverage",
      149.99,
    );
    console.log("✅ Seeded products to SQLite");
  }
}

module.exports = { db, seedProducts };
