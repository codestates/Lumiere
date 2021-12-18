import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getLatestProducts,
  zzimProduct,
  getZzimProducts,
  getCartItems,
  getTotalPrice,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// endpoint => /api/products
router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/latest').get(getLatestProducts);
router.route('/total-price').get(protect, getTotalPrice);
router.route('/cart-items').get(getCartItems);
router.route('/zzim').patch(protect, zzimProduct).get(protect, getZzimProducts);
router
  .route('/:id')
  .get(getProductById)
  .patch(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
