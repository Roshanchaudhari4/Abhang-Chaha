/**
 * Server entry point for Abhang Chaha backend
 * - Loads environment variables
 * - Connects to MongoDB
 * - Configures middlewares (CORS, JSON)
 * - Registers API routes
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to DB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/abhang_chaha';
connectDB(MONGO_URI).catch(err => {
  console.error('Failed to connect to DB, exiting');
  process.exit(1);
});

// Routes
app.use('/api', formRoutes);

// Health check
app.get('/', (req, res) => res.send('Abhang Chaha Backend is running'));

// Global error handler (simple)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
