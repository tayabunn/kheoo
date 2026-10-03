import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import couponRoutes from './routes/couponRoutes';
import authRoutes from './routes/authRoutes';
import aiRoutes from './routes/aiRoutes';
import apifyRoutes from './routes/apifyRoutes';
import { securityHeaders, createRateLimiter } from './middleware/securityMiddleware';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP Headers
app.use(securityHeaders);

// CORS Configuration with strict origin controls
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps or curl) or if origin is in whitelist
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('CORS policy: Access denied for this origin'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-api-key'],
  })
);

// Payload size limit to prevent memory exhaustion / DoS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global Rate Limiter: 150 requests per 15 minutes per IP
const globalLimiter = createRateLimiter(15 * 60 * 1000, 150, 'Too many requests. Please slow down.');
app.use('/api/', globalLimiter);

// Strict Rate Limiter for Authentication: 10 attempts per 15 minutes
const authLimiter = createRateLimiter(15 * 60 * 1000, 10, 'Too many authentication attempts. Please try again after 15 minutes.');
app.use('/api/v1/auth', authLimiter);

// Rate Limiter for AI Queries: 30 queries per 10 minutes
const aiLimiter = createRateLimiter(10 * 60 * 1000, 30, 'AI query rate limit exceeded. Please wait a moment before sending more messages.');
app.use('/api/v1/ai', aiLimiter);

// API Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/apify', apifyRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to KHEOO API Server (MongoDB)',
    status: 'running',
    security: 'hardened',
    health: '/api/v1/health',
  });
});

app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'KHEOO API Server',
    database: 'MongoDB',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Centralized Error Handling to avoid leaking stack traces
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API Error:', err?.message || err);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    success: false,
    error: isProd ? 'An unexpected server error occurred' : err?.message || 'Server error',
  });
});

app.listen(PORT, () => {
  console.log(`KHEOO Express API running securely on http://localhost:${PORT}`);
});
