import { Request } from 'express';

export interface UserData {
  id: string;
  email: string;
  role: string;
}

export interface CustomRequest extends Request {
  session: {
    user: UserData | null;
  };
}
