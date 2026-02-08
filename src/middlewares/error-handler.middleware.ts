import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error details internally
  logger.error(`HTTP status: ${res.statusCode || 500} - Message: ${err.message}`, { error: err, url: req.originalUrl });

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'An internal server error occurred' : err.message;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorHandler;
