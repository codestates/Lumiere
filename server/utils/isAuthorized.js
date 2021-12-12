import jwt from 'jsonwebtoken';

const isAuthorized = (req) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    const token = authorization.split(' ')[1];
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      // when token expired
      return null;
    }
  }
  return null;
};

export default isAuthorized;
