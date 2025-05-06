import express from 'express';
import db from '../connection.js';

const router = express.Router();

router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM tbl_reviews WHERE product_id = ?';

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    return res.json(results);
  });  
});


router.post('/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You must be logged in to post a review' });
  }

  const productId = req.params.id;
  const { title, details, rating } = req.body;
  const userId = req.user.user_id;

  const query = 'INSERT INTO tbl_reviews (user_id, product_id, review_title, review_desc, review_rating) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [userId, productId, title, details, rating], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: err });
    }
    
    return res.json(results); 
  });
});

export default router;