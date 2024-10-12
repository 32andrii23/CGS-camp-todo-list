import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { PrismaClient, User } from "@prisma/client";

import httpStatusCodes from '@/consts/status-codes';
import httpResponseMessages from '@/consts/response-messages';
import { APIError } from './error.middleware';

const prisma = new PrismaClient();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(payload.id) },
      });

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
    if (err) {
      return res.status(httpStatusCodes.Unauthorized).json({ message: httpResponseMessages.Unauthorized, err });
    }
    if (!user) {
      return res.status(httpStatusCodes.Unauthorized).json({ message: httpResponseMessages.Unauthorized });
    }

    req.user = user;

    next();
  })(req, res, next);
};

export const resourceOwnershipAuthorization = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
	try {
		const todoId = Number(req.params.todoId);
    const user = JSON.parse(req.headers.user as string);
    const userId = user.id;

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
      select: {
        userId: true,
      }
    })

    if(!todo) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.NotFound);
    }
    if(todo.userId !== userId) {
      throw new APIError(httpStatusCodes.Forbidden, httpResponseMessages.Forbidden);
    }

    next();
	} catch (error) {
    next(error);
	}
};

export const isVerified = (req: Request, _res: Response, next: NextFunction): void => {
  const user = JSON.parse(req.headers.user as string);

  if (!user.verified) {
    throw new APIError(httpStatusCodes.Unauthorized, httpResponseMessages.Unauthorized);
  }

  next();
};