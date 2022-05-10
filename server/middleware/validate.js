import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log('errors', errors);

  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }
  next();
};
