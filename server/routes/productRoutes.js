import express from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductsByFilter,
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
router
  .route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)
  .delete(protect, admin, deleteProduct);
router.route('/total-price').get(protect, getTotalPrice);
router.route('/filter').get(getProductsByFilter);
router.route('/latest').get(getLatestProducts);
router.route('/cart-items').get(getCartItems);
router.route('/zzim').patch(protect, zzimProduct).get(protect, getZzimProducts);
router.route('/:id').patch(protect, admin, updateProduct).get(getProductById);

export default router;
