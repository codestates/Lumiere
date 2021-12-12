/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import generateAccessToken from '../utils/generateToken.js';
import localTime from '../utils/localTime.js';
import { getAccessToken, getOption, getUserInfo } from '../utils/oAuth.js';

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
      token: generateAccessToken(user._id),
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
    { _id: req.user._id },
    { 'active.lastAccessTime': localTime() },
    {
      upsert: true,
    },
  );

  res.status(200).json({ message: `로그아웃 시간이 저장되었습니다` });
});

// @desc   Fetch token & userInfo from corporations
// @route  GET /api/users/oauth/:corporation
// @access Public
const oAuthLogin = asyncHandler(async (req, res) => {
  const { corporation } = req.params;
  const { code } = req.query;

  console.log('"corporation": ', corporation);
  console.log('"code": ', code);
  const options = getOption(corporation, code);
  // console.log('옵션', options);
  const token = await getAccessToken(options);
  console.log('토큰', token.data.access_token);
  const userInfo = await getUserInfo(
    options.userInfo_url,
    token.data.access_token,
  );
  console.log('유저', userInfo.data);
  const query = {};
  // query[corporation] = { uuid: userInfo.data.id };
  // console.log(typeof query[corporation].uuid);
  query.uuid = userInfo.data.id;
  console.log('"query": ', query);
  // DB와 연락하기
  const user = await User.findOne({
    'kakao.uuid': userInfo.data.id,
  });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateAccessToken(user._id),
    });
  } else {
    // 만약 이름이 허용이 아니라면?
    const newUser = new User({
      'kakao.uuid': userInfo.data.id,
      'kakao.token': token.data.access_token,
      'kakao.email': userInfo.data.kakao_account.email,
      name: userInfo.data.kakao_account.profile.nickname,
    });
    await newUser.save();
    res.json({
      _id: newUser._id,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
      token: generateAccessToken(newUser._id),
    });
  }
});

// @desc   Fetch token & userInfo from naver
// @route  GET /api/users/naver
// @access Public
// const naverUserInfo = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ 'general.email': email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       token: generateAccessToken(user._id),
//     });
//   } else {
//     res
//       .status(401)
//       .json({ message: '이메일 또는 비밀번호를 다시 확인해주세요' });
//   }
// });

// @desc   Fetch token & userInfo from google
// @route  POST /api/users/google
// @access Public
// const googleUserInfo = asyncHandler(async (req, res) => {
//   console.log(req.body.code);
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//   async function verify() {
//     const ticket = await client.verifyIdToken({
//       idToken: req.body.code,
//     });
//     const payload = ticket.getPayload();

//     // 디비에 연락 -> 기존 유저라면 토큰 업데이트, 신규 유저면 정보 저장
//     const user = await User.findOne({ 'google.uuid': payload.sub });
//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         isAdmin: user.isAdmin,
//         token: generateAccessToken(user._id),
//       });
//     } else {
//       const newUser = await User.create({
//         'google.uuid': payload.sub,
//         'google.email': payload.email,
//         name: payload.name,
//       });
//       res.json({
//         _id: newUser._id,
//         name: newUser.name,
//         isAdmin: newUser.isAdmin,
//         token: generateAccessToken(newUser._id),
//       });
//     }
//   }
//   verify().catch(console.error);
//   // 토큰 확인(해독)
// });

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
  let { password } = req.body;

  if (password) {
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
  }
  if (req.user.isAdmin === false) {
    await User.updateOne(
      { _id: req.user._id },
      {
        'active.lastAccessTime': localTime(),
        'active.isClosed': true,
        $unset: { 'general.password': 1 },
      },
      {
        upsert: true,
      },
    );
    res.status(200).json({
      message: '탈퇴가 정상적으로 완료되었습니다',
    });
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
      'google.token': 0,
      'naver.token': 0,
      'kakao.token': 0,
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
  // naverUserInfo,
  // googleUserInfo,
  checkPwd,
  updatePwd,
  logout,
  dropout,
  getUsers,
};
