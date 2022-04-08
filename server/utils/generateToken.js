import jwt from 'jsonwebtoken';

const generateAccessToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3h',
  });
};

export default generateAccessToken;
