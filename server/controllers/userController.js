/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken.js';

// @desc   Check a email address
// @route  POST /api/users/email
// @access Public
const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const emailExists = await User.findOne({ 'general.email': email });

  if (emailExists) {
    res.status(401).json({ message: '이미 해당 이메일이 존재합니다' });
  } else {
    res.status(200).send({ message: '사용 가능한 이메일입니다' });
  }
});

// @desc   Register a new user
// @route  POST /api/users/
// @access Public
const register = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password, name } = req.body;

  if (email && password && name) {
    const user = new User({
      general: { email, password },
      name,
    });
    user.markModified('general');
    await user.save();

    res.status(201).json({ message: '회원가입 성공' });
  } else {
    res.status(400).json({ message: '모든 항목은 필수입니다' });
  }
});

// @desc   Auth & get token for general user
// @route  POST /api/users/login
// @access Public
const generalLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ 'general.email': email });

  if (user && (await user.matchPassword(password))) {
    const refreshToken = generateRefreshToken(user._id);
    const newbe = await User.findByIdAndUpdate(
      user._id,
      { 'general.token': refreshToken },
      { new: true, upsert: true },
    );
    console.log(newbe);
    res
      .cookie('refreshToken', refreshToken, {
        sameSite: 'none',
        // secure: true, 추후 변경
        httpOnly: true,
      })
      .json({
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        accessToken: generateAccessToken(user._id),
      });
  } else {
    res
      .status(401)
      .json({ message: '이메일 또는 비밀번호를 다시 확인해주세요' });
  }
});

// @desc   Fetch token & userInfo from kakao
// @route  GET /api/users/kakao
// @access Public
const kakaoUserInfo = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ 'general.email': email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      accessToken: generateAccessToken(user._id),
    });
  } else {
    res
      .status(401)
      .json({ message: '이메일 또는 비밀번호를 다시 확인해주세요' });
  }
});

// @desc   Fetch token & userInfo from naver
// @route  GET /api/users/naver
// @access Public
const naverUserInfo = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ 'general.email': email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      accessToken: generateAccessToken(user._id),
    });
  } else {
    res
      .status(401)
      .json({ message: '이메일 또는 비밀번호를 다시 확인해주세요' });
  }
});

// @desc   Fetch token & userInfo from google
// @route  GET /api/users/google
// @access Public
const googleUserInfo = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ 'general.email': email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      accessToken: generateAccessToken(user._id),
    });
  } else {
    res
      .status(401)
      .json({ message: '이메일 또는 비밀번호를 다시 확인해주세요' });
  }
});

// @desc   Check user password
// @route  POST /api/users/profile
// @access Private
const checkPwd = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user._id);
  // 일반, 소설 유저 구분
  if (!user.general) {
    res.status(401).json({ message: '소셜 유저는 변경이 불가합니다' });
  } else if (await user.matchPassword(password)) {
    res.json({ message: '비밀번호 일치' });
  } else {
    res.status(401).json({ message: '비밀번호 불일치' });
  }
});

// @desc   Update user password
// @route  PATCH /api/users/profile
// @access Private
const updatePwd = asyncHandler(async (req, res) => {
  // checkUserPwd을 통해 일반 유저인지 확인했음
  if (req.body.password) {
    let { password } = req.body;
    password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { 'general.password': password },
      {
        new: true,
      },
    );
    res.status(200).json({
      message: '비밀번호가 성공적으로 변경되었습니다',
      token: generateAccessToken(updatedUser._id),
    });
  }
  // 2. 로그아웃 시 마지막 접속 시간 수정
});

// @desc   User logout
// @route  PATCH /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  // 로그아웃 시간 저장 -> 추후 휴먼 계정 전환 가능

  const { lastAccessTime } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { 'active.lastAccessTime': lastAccessTime },
    {
      new: true,
      upsert: true,
    },
  );
  res.status(200).json({
    message: `로그아웃 시간 ${updatedUser.active.lastAccessTime}`,
  });
});

// @desc   Delete user profile
// @route  PATCH /api/users/
// @access Private
const dropout = asyncHandler(async (req, res) => {
  // 회원 탈퇴 요청

  await User.findByIdAndUpdate(
    req.user._id,
    { active: req.body },
    {
      new: true,
      upsert: true,
    },
  );
  res.status(200).json({
    message: '탈퇴가 정상적으로 완료되었습니다',
  });
});

// @desc   Get all users
// @route  GET /api/users/
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // Admin 관리자 유저만 이 정보에 대한 권한이 있다.

  const users = await User.find(
    { isAdmin: false },
    {
      updatedAt: 0,
      isAdmin: 0,
      'general.password': 0,
      'google.token': 0,
      'naver.token': 0,
      'kakao.token': 0,
    },
  );
  res.json(users);
});

export {
  checkEmail,
  register,
  generalLogin,
  kakaoUserInfo,
  naverUserInfo,
  googleUserInfo,
  checkPwd,
  updatePwd,
  logout,
  dropout,
  getUsers,
};
