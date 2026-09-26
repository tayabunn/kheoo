import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import couponRoutes from './routes/couponRoutes';

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/coupons', couponRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to KHEOO API Server (MongoDB)',
    status: 'running',
    health: '/api/v1/health',
  });
});

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'KHEOO API Server',
    database: 'MongoDB',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`KHEOO Express API running on http://localhost:${PORT}`);
});
