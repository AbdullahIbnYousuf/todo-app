const Database = require('better-sqlite3');
const path = require('path');

// Create/open the database file in the backend folder
const db = new Database(path.join(__dirname, '../todos.db'));

// Optimize for performance & safety
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create the todos table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;