// // db.js
// const path = require('path');
// console.log('CURRENT DIR:', __dirname);
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// console.log('DB ENV in db.js:', {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });
// //require('dotenv').config();
// const mysql = require('mysql2/promise');


// // Create a pool of connections to the database
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,     // e.g. 'localhost'
//   user: process.env.DB_USER,     // e.g. 'root'
//   password: process.env.DB_PASS, // e.g. 'mypassword'
//   database: process.env.DB_NAME, // e.g. 'your_database'
//   waitForConnections: true,
//   connectionLimit: 10,           // how many connections in the pool
//   queueLimit: 0
// });

// module.exports = pool;
const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });


const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("DB config:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = pool;
