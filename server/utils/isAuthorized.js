import jwt from 'jsonwebtoken';

const isAuthorized = (req) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  }
  return undefined;
};

export default isAuthorized;
