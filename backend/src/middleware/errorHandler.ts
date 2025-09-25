import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { config } from '../config/environment';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class ApiError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = 'ApiError';

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createError = (message: string, statusCode: number = 500): ApiError => {
  return new ApiError(message, statusCode);
};

export const errorHandler = (
  error: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: any = null;

  // Handle different error types
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    details = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code,
    }));
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    details = error.message;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    statusCode = 500;
    message = 'Database Error';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
    details = error.message;
  }

  // Log error
  logger.error(`${req.method} ${req.path} - ${message}`, {
    statusCode,
    stack: config.NODE_ENV === 'development' ? error.stack : undefined,
    userId: (req as any).user?.id,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    details,
  });

  // Send error response
  const errorResponse: any = {
    success: false,
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  // Add details in development or for validation errors
  if (config.NODE_ENV === 'development' || statusCode === 400) {
    if (details) {
      errorResponse.details = details;
    }
    if (config.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }
  }

  res.status(statusCode).json(errorResponse);
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Not found error
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

// Rate limit error
export const rateLimitError = (req: Request, res: Response) => {
  res.status(429).json({
    success: false,
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.',
    statusCode: 429,
    timestamp: new Date().toISOString(),
  });
};

// Common error responses
export const errorResponses = {
  unauthorized: () => new ApiError('Authentication required', 401),
  forbidden: () => new ApiError('Access denied', 403),
  notFound: (resource: string = 'Resource') => new ApiError(`${resource} not found`, 404),
  badRequest: (message: string = 'Bad request') => new ApiError(message, 400),
  conflict: (message: string = 'Resource already exists') => new ApiError(message, 409),
  unprocessable: (message: string = 'Unprocessable entity') => new ApiError(message, 422),
  tooManyRequests: () => new ApiError('Too many requests', 429),
  internal: (message: string = 'Internal server error') => new ApiError(message, 500),
  serviceUnavailable: (service: string = 'Service') => new ApiError(`${service} unavailable`, 503),
};