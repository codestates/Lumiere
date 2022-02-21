// err custom handler

import logger from '../config/logger.js';

const notFound = (req, res, next) => {
  const err = `Not Found - ${req.originalUrl}`;
  logger.error(err);
  res.status(404);
  next(new Error(err));
};

const errHandler = (err, req, res) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  const data = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };
  logger.error(data);
  res.status(statusCode);
  res.json(data);
};
// 개발 환경일 경우에만 스텍 보여주기

export { notFound, errHandler };
