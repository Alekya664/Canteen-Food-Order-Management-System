const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Alekya@123',
  database: 'myweb',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  multipleStatements:true
});


module.exports = pool;