const express = require('express');
const router = express.Router();
const pool = require('./database');

router.post('/register', async (req, res) => {
  const userid = req.body.userid;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;

  try {
    const [rows, fields] = await pool.execute('INSERT INTO register (userid, email, role, password) VALUES (?, ?, ?, ?)', [userid, email, role, password]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;