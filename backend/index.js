const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB Atlas
connectDB();

// Configure CORS (Reflect incoming origin for 100% browser compatibility)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Healthcheck Endpoint for Render Monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Dream Deco Auth API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Dream Deco Enterprise Authentication API',
    health: '/health',
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[Dream Deco Server] Running on port ${PORT}`);
});
