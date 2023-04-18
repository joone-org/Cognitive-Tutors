import { Document } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
declare global {
  namespace Express {
    export interface Request {
      currentUser: Document & IUser;
      cookies: {
        token: string
      };
      token: any
    }
  }
}
