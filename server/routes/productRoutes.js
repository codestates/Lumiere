import express from 'express';
import {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  getLatestProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js'; // for private routes

const router = express.Router();

// endpoint => /api/products
router.route('/').post(protect, admin, createProduct).get(getProducts);
router.route('/:id').patch(protect, admin, updateProduct).get(getProductById);
router.route('/latest').get(getLatestProducts);

export default router;
