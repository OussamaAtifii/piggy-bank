import { NextFunction, Response } from 'express';
import { CustomRequest, UserData } from '../types/types';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

export default function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  req.session = { user: null };

  try {
    console.log('The token is:', token);
    const data = jwt.verify(token, JWT_SECRET_KEY) as UserData;

    req.session.user = data;
    console.log('The user is:', data);
  } catch {}

  next();
}
