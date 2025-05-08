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

router.get('/', (req, res) => {
  const types = req.query.type; 
  const search = req.query.search;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  let whereClauses = [];
  let values = [];

  // Build WHERE clause for search
  if (search && search !== '') {
    whereClauses.push(`product_title LIKE ?`);
    values.push(`%${search}%`);
  }

  // Build WHERE clause for types
  if (types) {
    if (Array.isArray(types)) {
      whereClauses.push(`product_type IN (${types.map(() => '?').join(',')})`);
      values.push(...types);
    } else {
      whereClauses.push(`product_type = ?`);
      values.push(types);
    }
  }

  const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // Main paginated query
  const paginatedQuery = `SELECT * FROM tbl_products ${whereSQL} LIMIT ? OFFSET ?`;
  const countQuery = `SELECT COUNT(*) AS total FROM tbl_products ${whereSQL}`;

  db.query(countQuery, values, (err, countResult) => {
    if (err) {
      console.error('Database count error:', err);
      return res.status(500).json({ error: err });
    }

    db.query(paginatedQuery, [...values, limit, offset], (err, dataResult) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: err });
      }

      return res.json({
        total: countResult[0].total,
        products: dataResult
      });
    });
  });
});


export default router;