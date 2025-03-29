// db.js
const mysql = require('mysql2/promise');

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // e.g. 'localhost'
  user: process.env.DB_USER,     // e.g. 'root'
  password: process.env.DB_PASS, // e.g. 'mypassword'
  database: process.env.DB_NAME, // e.g. 'your_database'
  waitForConnections: true,
  connectionLimit: 10,           // how many connections in the pool
  queueLimit: 0
});

module.exports = pool;
