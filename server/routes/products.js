import express from 'express';
import db from '../connection.js';

const router = express.Router();

// Single product
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM tbl_products WHERE product_id = ?';

  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(results[0]);
  });  
});

// Pagination logic for products list
router.get('/', (req, res) => {
  const types = req.query.type; 
  const search = req.query.search;
  var searchQuery = '';
  var searchQueryWhere = '';
  if (search != undefined && search != '') {
    searchQuery = " AND product_title LIKE '" + search + "'";
    searchQueryWhere = "WHERE product_title LIKE '" + search + "'";
  } 
  if (types) {
    var filtersQuery = 'SELECT * FROM tbl_products';
    var params = [];
    if (Array.isArray(types)) {
      const placeholders = types.map(() => '?').join(', ');
      filtersQuery += ` WHERE product_type IN (${placeholders})`;
      params.push(...types);
    } else {
      filtersQuery += ' WHERE product_type = ?';
      params = [types];
    }
    filtersQuery += searchQuery;
    db.query(filtersQuery, params, (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: err });
      }

      return res.json(results);  // Send paginated products
    });
  } else {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    const query = `SELECT * FROM tbl_products ${searchQueryWhere} LIMIT ? OFFSET ?`;
    db.query(query, [limit, offset], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: err });
      }

      return res.json(results);  // Send paginated products
    });
  }
});

export default router;