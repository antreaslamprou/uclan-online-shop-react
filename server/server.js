import express from 'express';
import cors from 'cors';
import offerRoutes from './routes/offers.js';
import productRoutes from './routes/products.js';
// import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', offerRoutes);
app.use('/products', productRoutes);
// app.use('/auth', authRoutes);

app.listen(3001, () => {
  console.log(`Server running on ${process.env.REACT_APP_API_URL}`);
});
