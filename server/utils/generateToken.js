import jwt from 'jsonwebtoken';

// user._id를 통해 토큰 생성
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

export default generateAccessToken;
