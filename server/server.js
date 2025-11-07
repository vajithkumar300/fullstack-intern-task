import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';

import templateRoutes from './routes/templateRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS: allow client to send cookies
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/favorites', favoriteRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// global error handler (basic)
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
