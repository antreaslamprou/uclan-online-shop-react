import express from 'express';
import db from '../connection.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.query(
      'SELECT * FROM tbl_users WHERE user_email = ?',
      [email],
      async (err, results) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ error: 'Server error' });
        }
  
        if (results.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        const user = results[0];
        const match = await bcrypt.compare(password, user.user_pass);
  
        if (match) {
          res.json({ message: 'Login successful', user });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      }
    );
  });

// Register
router.post('/signup', async (req, res) => {
    const { email, password, name, address } = req.body;
    try {
      db.query('SELECT * FROM tbl_users WHERE user_email = ?', [email], async (err, results) => {
        if (err) {
          console.error('Signup error:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        if (results.length > 0) {
          return res.status(409).json({ error: 'User already exists with that email' });
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.query(
        'INSERT INTO tbl_users (user_email, user_pass, user_full_name, user_address) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, address],
        (err, result) => {
            if (err) {
                console.error('Signup error:', err);
                return res.status(500).json({ error: 'Server error' });
            }
            res.status(201).json({ message: 'User created', userId: result.insertId });
        });
      });
    } catch (err) {
        console.error('Hashing error:', err);
        res.status(500).json({ error: 'Internal error' });
    } 
  });
  

export default router;