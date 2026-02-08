import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserPayload } from '../utils/jwtToken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }
  const token = authHeader.split(' ')[1] as string;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;
    req.user = decoded; // Attach user to request
    req.user
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};