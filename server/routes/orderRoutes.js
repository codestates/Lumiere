import express from 'express';
import {
  createOrder,
  updateOrderToPaid,
  cancelOrder,
  updateOrderStatus,
  getLatestOrder,
  getMyOrders,
  getOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// endpoint => /api/orders
router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/pay').patch(protect, updateOrderToPaid);
router.route('/latest').get(protect, getLatestOrder);
router.route('/mine').get(protect, getMyOrders);
router
  .route('/:id')
  .get(protect, getOrderById)
  .patch(protect, updateOrderStatus)
  .delete(protect, cancelOrder);

export default router;
