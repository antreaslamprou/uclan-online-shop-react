import express from 'express';
import bcrypt from 'bcrypt';
import db from '../connection.js';
import passport from '../passport.js';

const router = express.Router();

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err); // server error
    if (!user) return res.status(401).json({ error: info.message }); // invalid credentials

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

router.post('/signup', async (req, res) => {
  const { email, password, name, address } = req.body;

  db.query('SELECT * FROM tbl_users WHERE user_email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'User already exists with that email' });
    }

    try {
      const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      db.query(
        'INSERT INTO tbl_users (user_email, user_pass, user_full_name, user_address) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, address],
        (err, result) => {
          if (err) {
            console.error('Signup insert error:', err);
            return res.status(500).json({ error: 'Database error' });
          }

          const newUser = {
            email,
            hashedPassword,
            name,
            address
          };

          // Auto-login the new user
          req.login(newUser, (err) => {
            if (err) {
              console.error('Login after signup failed:', err);
              return res.status(500).json({ error: 'Login after signup failed' });
            }
            res.status(201).json({ message: 'User registered and logged in', user: newUser });
          });
        }
      );
    } catch (error) {
      console.error('Hashing error:', error);
      res.status(500).json({ error: 'Internal error' });
    }
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});


// Logout
router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out' });
    });
  });
});

export default router;