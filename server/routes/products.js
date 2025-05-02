import express from 'express';
import db from '../connection.js';

const router = express.Router();

router.get('/', (req, res) => {
    const productId = req.query.id;
  
    // If a productId is specified, fetch the single product
    if (productId) {
      const query = 'SELECT * FROM tbl_products WHERE product_id = ?';
  
      db.query(query, [productId], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ error: err });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        return res.json(results[0]);  // Send the single product
      });
      return; // Stop further code execution if a single product is requested
    }
  
    // Pagination logic if no productId is specified
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;
  
    const query = 'SELECT * FROM tbl_products LIMIT ? OFFSET ?';
  
    db.query(query, [limit, offset], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: err });
      }
  
      return res.json(results);  // Send paginated products
    });
});

export default router;