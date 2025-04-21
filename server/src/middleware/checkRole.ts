import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user: IUser;
}

export const checkRole = (role: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
}; 