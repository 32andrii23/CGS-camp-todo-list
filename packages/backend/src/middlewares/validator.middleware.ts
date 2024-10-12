import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { APIError } from '@/middlewares/error.middleware';
import httpStatusCodes from '@/consts/status-codes';

export const validate = (schema: ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
      
    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      
      next(new APIError(httpStatusCodes.BadRequest, validationErrors.join(', ')));
    }

    next();
  };
};
