/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import generateAccessToken from '../utils/generateToken.js';
import localTime from '../utils/localTime.js';
import {
  getAccessToken,
  getOption,
  getUserInfo,
  revokeAccess,
  updateAccessToken,
} from '../utils/oAuth.js';

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
// @route  POST /api/users
// @access Public
const register = asyncHandler(async (req, res) => {
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

  if (!user) {
    res.status(401).json({ message: '이메일을 다시 확인해주세요' });
    return;
  }

  if (user.active.isClosed === true && !user.general.password) {
    res.status(401).json({ message: '이미 탈퇴한 회원입니다' });
    return;
  }

  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateAccessToken(user._id, user.isAdmin),
    });
  } else {
    res.status(401).json({ message: '비밀번호를 다시 확인해주세요' });
  }
});

// @desc   User logout
// @route  GET /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  // 로그아웃 시간 저장 -> 추후 휴먼 계정 전환 가능

  await User.updateOne(
    { _id: req.user.id },
    { 'active.lastAccessTime': localTime() },
    {
      upsert: true,
    },
  );

  res.status(200).json({ message: `로그아웃 시간이 저장되었습니다` });
});

// @desc   Fetch token & userInfo from corporations
// @route  GET /api/users/:corp
// @access Public
const oAuthLogin = asyncHandler(async (req, res) => {
  const { corp } = req.params;
  const { code } = req.query;

  const options = getOption(corp, code);
  const token = await getAccessToken(options, 'authorization_code');
  const userInfo = await getUserInfo(corp, options.userInfo_url, token);

  let uuid;
  let email;
  let name;

  if (corp === 'google') {
    uuid = userInfo.sub;
    email = userInfo.email;
    name = userInfo.name;
  }
  if (corp === 'kakao') {
    uuid = userInfo.id;
    email = userInfo.kakao_account.email;
    name = userInfo.kakao_account.profile.nickname;
  }
  if (corp === 'naver') {
    uuid = userInfo.response.id;
    email = userInfo.response.email;
    name = userInfo.response.name;
  }
  // DB와 연락하기
  const { access_token, refresh_token } = token;
  const user = await User.findOneAndUpdate(
    {
      [`${corp}.uuid`]: uuid,
    },
    {
      [`${corp}.email`]: email,
      [`${corp}.accessToken`]: access_token,
      [`${corp}.refreshToken`]: refresh_token,
      'active.isClosed': false,
    },
    { new: true },
  );

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateAccessToken(user._id, user.isAdmin),
    });
  } else {
    const newUser = new User({
      [`${corp}.uuid`]: uuid,
      [`${corp}.email`]: email,
      [`${corp}.accessToken`]: access_token,
      [`${corp}.refreshToken`]: refresh_token,
      name,
    });

    await newUser.save();
    res.json({
      _id: newUser._id,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
      token: generateAccessToken(newUser._id, newUser.isAdmin),
    });
  }
});

// @desc   Check user password
// @route  POST /api/users/profile
// @access Private
const checkPwd = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user.id);
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
  let { password } = req.body;

  if (password) {
    password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { 'general.password': password },
      {
        new: true,
      },
    );
    res.status(200).json({
      message: '비밀번호가 성공적으로 변경되었습니다',
      token: generateAccessToken(updatedUser._id, updatedUser.isAdmin),
    });
  } else {
    res.status(400).json({
      message: '새 비밀번호를 입력해주세요',
    });
  }
});

// @desc   Delete user profile
// @route  DELETE /api/users/profile
// @access Private & Private/Admin
const dropout = asyncHandler(async (req, res) => {
  // 유저 본인이 탈퇴 요청 / 관리자가 탈퇴 요청

  if (req.user.isAdmin === true) {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({
        message: '탈퇴시킬 회원을 기입해주세요',
      });
      return;
    }
    const user = await User.findById(userId);
    if (user.general.email) {
      await User.updateOne(
        { _id: userId },
        {
          'active.lastAccessTime': localTime(),
          'active.isClosed': true,
          $unset: { 'general.password': 1 },
        },
        { new: true, upsert: true },
      );
      res.status(200).json({
        message: `해당 유저를 정상적으로 탈퇴시켰습니다`,
      });
      return;
    }
    res.status(400).json({
      message: `소셜 로그인 유저입니다`,
    });
    return;
  }

  if (req.user.isAdmin === false) {
    const user = await User.findById(req.user.id);
    if (user.general.email) {
      await User.updateOne(
        { _id: req.user.id },
        {
          'active.lastAccessTime': localTime(),
          'active.isClosed': true,
          $unset: { 'general.password': 1 },
        },
        {
          upsert: true,
        },
      );
      res.status(200).json({ message: '루미에르를 탈퇴하셨습니다' });
      return;
    }
    const { google, naver, kakao } = user;
    const corp = google.uuid
      ? 'google'
      : naver.uuid
      ? 'naver'
      : kakao.uuid
      ? 'kakao'
      : null;

    const options = getOption(corp, `${user[corp].refreshToken}`);
    const token = await updateAccessToken(options, 'refresh_token');
    const { access_token } = token;

    // 엑세스 끊기
    const revokeRes = await revokeAccess(corp, access_token);
    let message;

    if (revokeRes.data.id && corp === 'kakao') {
      message = '카카오 계정과 연결 끊기 완료';
    }
    if (revokeRes.data.result === 'success' && corp === 'naver') {
      message = '네이버 계정과 연결 끊기 완료';
    }
    if (revokeRes.status === 200 && corp === 'google') {
      message = '구글 계정과 연결 끊기 완료';
    }
    await User.updateOne(
      { _id: req.user.id },
      {
        'active.lastAccessTime': localTime(),
        'active.isClosed': true,
        $unset: {
          [`${corp}.accessToken`]: 1,
          [`${corp}.refreshToken`]: 1,
        },
      },
      { upsert: true },
    );
    res.status(200).json(message);
  }
});

// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // Admin 관리자 유저만 이 정보에 대한 권한이 있다.

  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments({ isAdmin: false });

  const users = await User.find(
    { isAdmin: false },
    {
      isAdmin: 0,
      'general.password': 0,
      'google.accessToken': 0,
      'naver.accessToken': 0,
      'kakao.accessToken': 0,
      'google.refreshToken': 0,
      'naver.refreshToken': 0,
      'kakao.refreshToken': 0,
    },
  )
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .exec();

  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

export {
  checkEmail,
  register,
  generalLogin,
  oAuthLogin,
  checkPwd,
  updatePwd,
  logout,
  dropout,
  getUsers,
};
