import jwt from 'jsonwebtoken';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface UserPayload {
    id: string
    username: string,
    role: string
}
export interface AuthRequest extends Request {
    user?: UserPayload;
}

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
export const generateToken = (user: UserPayload): string => {
    return jwt.sign(user, JWT_SECRET, {expiresIn: '24h'});
}