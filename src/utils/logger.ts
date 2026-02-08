// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // Log stack traces for errors
    winston.format.json() // Use JSON format for structured logging
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug', // Log 'debug' and above to console in development
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log only errors to a file
    new winston.transports.File({ filename: 'logs/combined.log' }), // Log all levels to a combined file
  ],
});

export default logger;
