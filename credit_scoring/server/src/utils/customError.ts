export class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'CustomError';
    Error.captureStackTrace(this, this.constructor);
  }
} 