import { Router } from 'express';
import {
  createOrder,
  createPosOrder,
  getOrders,
  getOrderStats,
  getOrderById,
} from '../controllers/orderController';

const router = Router();

router.get('/', getOrders);
router.get('/stats/summary', getOrderStats);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.post('/pos', createPosOrder);

export default router;

