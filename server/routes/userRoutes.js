import express from 'express';
import {
  generalLogin,
  oAuthLogin,
  // googleUserInfo,
  // naverUserInfo,
  register,
  checkEmail,
  checkPwd,
  updatePwd,
  logout,
  dropout,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// endpoint => /api/users
router.route('/').post(register).get(protect, admin, getUsers);
router.route('/email').post(checkEmail);
router.route('/login').post(generalLogin);
router.route('/logout').get(protect, logout);
router.route('/oauth/:corporation').get(oAuthLogin);
// router.route('/naver').get(naverUserInfo);
// router.route('/google').post(googleUserInfo);

router
  .route('/profile')
  .post(protect, checkPwd)
  .patch(protect, updatePwd)
  .delete(protect, dropout);

export default router;
