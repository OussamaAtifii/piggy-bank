import { Response, NextFunction } from 'express';
import { CustomRequest, UserData } from '../types/types';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  req.session = { user: null };

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY) as UserData;
    req.session.user = data;
  } catch (error) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Unauthenticated user' });
  }

  next();
};

export default authMiddleware;
