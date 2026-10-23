import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seeder.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

// Load environment variables from .env file
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set in server/.env — authentication cannot work without it.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// ==========================================
// Middleware Configuration
// ==========================================

// Configure Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      // In development, allow localhost client or configured CLIENT_URL
      const allowedOrigins = [
        CLIENT_URL,
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
      ];
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by Access-Control-Allow-Origin'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// JSON and URL-encoded body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple root welcome route
app.get('/', (req, res) => {
  res.json({
    project: 'Scentora',
    title: 'Scentora — A Web-Based E-Commerce Platform',
    tagline: 'Discover Your Signature Scent.',
    healthCheck: '/api/health',
    endpoints: ['/api/auth', '/api/products', '/api/categories', '/api/orders', '/api/account', '/api/admin'],
  });
});

// ==========================================
// API Routes
// ==========================================
app.use('/api', apiRouter);

// ==========================================
// Centralized Error Handling
// ==========================================
app.use(notFoundHandler);
app.use(errorHandler);

// ==========================================
// Start Server and Database Connection
// ==========================================
const startServer = async () => {
  // Connect to MongoDB asynchronously (non-blocking for server initialization)
  await connectDB();

  // First run: populate an empty database with the demo catalogue, accounts and orders
  if (mongoose.connection.readyState === 1) {
    try {
      const seeded = await seedDatabase();
      if (Object.values(seeded).some(Boolean)) console.log('🌱 Seeded empty collections:', seeded);
    } catch (error) {
      console.warn(`⚠️  Auto-seed skipped: ${error.message}`);
    }
  }

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  🌟 SCENTORA API SERVER RUNNING`);
    console.log(`  🚀 Port:        http://localhost:${PORT}`);
    console.log(`  🩺 Health:      http://localhost:${PORT}/api/health`);
    console.log(`  💻 Client URL:  ${CLIENT_URL}`);
    console.log(`  ⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`======================================================\n`);
  });
};

startServer();

export default app;
