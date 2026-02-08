
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../utils/jwtToken';

type UserRole = 'user' | 'admin' | 'customer';

export const authorizeRoles = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
  
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'User not authenticated or role not assigned.' });
    }

    if (!allowedRoles.includes(req.user?.role as any)) {
      return res.status(403).json({ error: 'Insufficient permissions.' });
    }
    next();
  };
};
