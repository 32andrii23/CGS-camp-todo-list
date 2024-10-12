import { Request, Response, NextFunction } from 'express';

export class APIError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (
  err: Error | APIError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof APIError) {
    statusCode = err.statusCode || 500;
    message = err.message || 'Something went wrong';
  }

  return res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
