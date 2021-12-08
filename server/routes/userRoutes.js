import express from 'express';
import {
  generalLogin,
  kakaoUserInfo,
  googleUserInfo,
  naverUserInfo,
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
router
  .route('/')
  .post(register)
  .patch(protect, dropout)
  .get(protect, admin, getUsers);
router.route('/email').post(checkEmail);
router.route('/login').post(generalLogin);
router.route('/kakao').get(kakaoUserInfo);
router.route('/naver').get(naverUserInfo);
router.route('/google').post(googleUserInfo);
router.route('/logout').patch(protect, logout);

router.route('/profile').post(protect, checkPwd).patch(protect, updatePwd);

export default router;
