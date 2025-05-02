import express from 'express';
import db from '../connection.js';

const router = express.Router();

// Offers
router.get('/', (req, res) => {
  db.query('SELECT * FROM tbl_offers', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

export default router;