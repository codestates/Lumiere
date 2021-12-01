import jwt from 'jsonwebtoken';

// user._id를 통해 토큰 생성
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
};

export default generateToken;
