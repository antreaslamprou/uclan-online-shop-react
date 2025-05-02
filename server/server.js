const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const caCert = fs.readFileSync('./ca.pem');
const app = express();
app.use(cors()); // Allow React to access this server
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: caCert
  }
});

// Offers
app.get('/', (req, res) => {
  db.query('SELECT * FROM tbl_offers', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.get('/products', (req, res) => {
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


app.listen(3001, () => {
  console.log(`Server running on ${process.env.REACT_APP_API_URL}`);
});
