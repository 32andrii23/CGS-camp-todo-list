import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

import httpResponseMessages from "@/consts/response-messages";
import httpStatusCodes from "@/consts/status-codes";
import { APIError } from "@/middlewares/error.middleware";
import { emailService } from "./email.service";

const prisma = new PrismaClient();

export default class UserService {
  async createUser(data: Pick<User, "name" | "email" | "password">): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verificationToken = crypto.randomBytes(16).toString('hex');

    try {
			const user = await prisma.user.create({
				data: {
					...data,
					password: hashedPassword,
					verificationToken,
				},
			});
      
      await emailService.sendVerificationEmail(user.email, verificationToken);

			return user;
		} catch (error) {
			throw new APIError(httpStatusCodes.InternalServerError, httpResponseMessages.InternalServerError);
		}
  }

  async loginUser(email: string, password: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.UserNotFound);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new APIError(httpStatusCodes.Unauthorized, httpResponseMessages.WrongPassword);
    }

    return user;
  }

  async logoutUser(refreshToken: string): Promise<void> {
    await prisma.user.updateMany({
      where: {
        refreshToken
      },
      data: {
        refreshToken: null,
        refreshTokenExpirationDate: null
      }
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.UserNotFound);
    }

    return user;
  }

  async verifyUser(verificationToken: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken
      }
    });
  
    if (!user) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.UserNotFound);
    }
  
    const userUpdated = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        verified: true,
        verificationToken: null
      }
    });

    return userUpdated;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.UserNotFound);
    }

    const changePasswordToken = crypto.randomBytes(16).toString('hex');
    const changePasswordTokenExpirationDate = new Date(Date.now() + 20 * 60 * 1000);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        changePasswordToken,
        changePasswordTokenExpirationDate
      }
    });

    await emailService.sendChangePasswordEmail(user.email, changePasswordToken);
  }

  async changePassword(changePasswordToken: string, password: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        changePasswordToken
      }
    });

    if (!user) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.UserNotFound);
    }
    
    const newHashedPassword = await bcrypt.hash(password, 10);

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: newHashedPassword,
        changePasswordToken: null,
        changePasswordTokenExpirationDate: null
      }
    });

    return userUpdated;
  }

  async updateRefreshToken(refreshToken: string, userId: string): Promise<void> {
    const refreshTokenExpirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    
    await prisma.user.update({
      where: {
        id: Number(userId)
      },
      data: {
        refreshToken,
        refreshTokenExpirationDate
      }
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    });
  
    if (!user) {
      throw new APIError(httpStatusCodes.NotFound, httpResponseMessages.UserNotFound);
    }

    const userUpdated = await prisma.user.update({
      where: {
        id
      },
      data
    });

    return userUpdated;
  }
}

