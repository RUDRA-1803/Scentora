import { Router } from 'express';
import {
  createOrder,
  listMyOrders,
  listAllOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController.js';
import { protect, optionalAuth, adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/', optionalAuth, createOrder);
router.get('/mine', protect, listMyOrders);
router.get('/', protect, adminOnly, listAllOrders);
router.get('/:id', optionalAuth, getOrder);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

export default router;
