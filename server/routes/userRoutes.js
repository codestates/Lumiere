import express from 'express';
import { body, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import {
  generalLogin,
  oAuthLogin,
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

const validateEmail = [
  body('email') //
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('이메일 형식이 유효하지 않습니다'),
  validate,
];

const validatePassword = [
  body('password') //
    .trim()
    .isLength({ min: 8 })
    .withMessage('비밀번호를 8자 이상 입력해주세요')
    .bail()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .withMessage('비밀번호 형식이 유효하지 않습니다'),
  validate,
];

const validateCredentials = [...validateEmail, ...validatePassword, validate];

const validateSignup = [
  ...validateCredentials,
  body('name') //
    .trim()
    .isLength({ min: 2, max: 52 })
    .withMessage('성함을 2글자 이상, 52글자 이하로 입력해주세요'),
  validate,
];

const validateOauth = [
  query('code', 'authorization_code가 필요합니다').notEmpty(),
  validate,
];

// endpoint => /api/users
router.route('/').post(validateSignup, register).get(protect, admin, getUsers);
router.route('/email').post(validateEmail, checkEmail);
router.route('/login').post(validateCredentials, generalLogin);
router.route('/logout').get(protect, logout);
router.route('/:corp').get(validateOauth, oAuthLogin);

router
  .route('/profile')
  .post(protect, validatePassword, checkPwd)
  .patch(protect, updatePwd)
  .delete(protect, dropout);

export default router;
