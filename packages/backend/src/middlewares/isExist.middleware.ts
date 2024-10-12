import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { APIError } from '@/middlewares/error.middleware';
import httpStatusCodes from '@/consts/status-codes';
import httpResponseMessages from '@/consts/response-messages';

export type PrismaModelDelegate = {
  [T in keyof PrismaClient]: PrismaClient[T] extends {
    findUnique: (args: { where: { id: number } }) => Promise<unknown>;
  }
    ? PrismaClient[T]
    : never;
};

const prisma = new PrismaClient();

const isExist = <T extends keyof PrismaModelDelegate>(model: T): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const id = Number(req.params.todoId);

    try {
      const modelDelegate = prisma[model] as PrismaModelDelegate[T];
      const item = await modelDelegate.findUnique({ where: { id } });
      
      if (!item) {
        throw new APIError(
          httpStatusCodes.NotFound,
          httpResponseMessages.NotFound
        );
      }

      next();
    } catch (err) {
      next(err);
    }
    
  };
};

export default isExist;
