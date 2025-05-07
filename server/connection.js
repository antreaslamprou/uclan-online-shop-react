import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('../.env') });

// Build the absolute path to the cert
const AbsoluteCAPath = path.resolve('../', process.env.CA_CERTIFICATE_PATH);
const CACertificate = fs.readFileSync(AbsoluteCAPath);

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      ca: CACertificate
    }
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to the MySQL database.');
    }
});

export default db;