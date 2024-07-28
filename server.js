const express = require('express');
const path = require('path');
const pool = require('./database');
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2");

// Serve static files (HTML, CSS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alekya@123',
    database: 'myweb',
    connectionLimit: 10 // increase the connection limit
});

db.connect(function(err){
    if (err) throw err;

    console.log("Connected...");
})

// Create login table
const createLoginTable = `CREATE TABLE IF NOT EXISTS login (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
)`;

// Create login table
const createRegisterTable = `CREATE TABLE IF NOT EXISTS login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )`;
  

// Execute the create table queries
db.query(createLoginTable, (err, result) => {
  if (err) throw err;
  console.log('Login table created');
});

// Execute the create table queries
db.query(createRegisterTable, (err, result) => {
    if (err) throw err;
    console.log('Register table created');
  });

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  console.log(req.body);

  try {
    const [rows, fields] = await pool.execute('INSERT INTO login (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
    const userid = req.body.userid;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    console.log(req.body);
    try {
      const [rows, fields] = await pool.execute('INSERT INTO register (userid, email, role, password) VALUES (?, ?, ?, ?)', [userid, email, role, password]);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


  app.post('/add_menu_item', async (req, res) => {
    const cart = req.body.cart;
    const orderid = req.body.orderid;
    const total = req.body.total;
    console.log(req.body);
  
    try {
      const [rows, fields] = await pool.execute('INSERT INTO menuform (cart, orderid, total) VALUES (?, ?, ?)', [cart, orderid, total]);
      res.status(201).json({ message: 'Menu item added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Route to serve the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route to serve the menu page
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Route to serve the kitchen staff page
app.get('/kitchen_staff', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'kitchen_staff.html'));
});

// Route to serve the about us page
app.get('/aboutus', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'aboutus.html'));
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


