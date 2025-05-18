import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { CustomError } from '../utils/customError';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      throw new CustomError('Validation error', 400, 'VALIDATION_ERROR', errors);
    }
    next();
  };
}; 