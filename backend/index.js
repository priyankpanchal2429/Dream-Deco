const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const User = require('./database/User');

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB Atlas
connectDB().then(async () => {
  // Pre-seed default admin account if collection is empty
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash('Password123!', salt);
      await User.create({
        full_name: 'Admin User',
        user_id: 'admin',
        password_hash,
      });
      console.log('[Seed] Created default admin account: admin / Password123!');
    }
  } catch (seedErr) {
    console.error('[Seed Error]', seedErr.message);
  }
});

// Configure CORS
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback allow for development flexibility
    },
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
