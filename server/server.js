import express from "express";
import session from "express-session";
import cors from 'cors';
import passport from "./passport.js";
import offerRoutes from './routes/offers.js';
import productRoutes from './routes/products.js';
import reviewRoutes from './routes/reviews.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', offerRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);

app.listen(3001, () => {
  console.log(`Server running on ${process.env.REACT_APP_API_URL}`);
});
