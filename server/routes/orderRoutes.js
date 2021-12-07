import express from 'express';
import {
  createOrder,
  updateOrderStatus,
  getLatestOrder,
  getMyOrders,
  getOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// 순서도 중요하다
// when you placed (/:id) above the (/myorder), then you input the URL with /.../myorders,
// Route will consider myorders as an id, and it is not a type of ObjectId

// endpoint => /api/orders
router
  .route('/')
  .post(protect, createOrder) // 주문 생성
  .get(protect, admin, getOrders); // 전체 주문
router.route('/latest').get(protect, getLatestOrder); // 자신의 최신 결제 정보
router.route('/mine').get(protect, getMyOrders); // 자신의 주문 전체 내역
router
  .route('/:id')
  .get(protect, getOrderById) // 주문 상세 정보
  .patch(protect, updateOrderStatus); // 주문 진행단계 변경

export default router;
