import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import httpResponseMessages from "@/consts/response-messages";
import httpStatusCodes from "@/consts/status-codes";
import { APIError } from "@/middlewares/error.middleware";

const prisma = new PrismaClient();

export class JwtTokens {
  public static generateTokens(userId: string): { accessToken: string, refreshToken: string } {
    const accessToken = jwt.sign(
      { id: userId },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m" }
    );
    const refreshToken = jwt.sign(
      { id: userId },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION || "30d" }
    );

    return { accessToken, refreshToken };
  }

  public static async verifyRefreshToken(token: string): Promise<string> {
    try {
      const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
      const id = Number((payload as { id: number }).id); 

      const user = await prisma.user.findUnique({
        where: {
          id
        }
      });
      
      if (!user) {
        throw new APIError(httpStatusCodes.Unauthorized, httpResponseMessages.WrongRefreshToken);
      }
      
      return user.id.toString();
    } catch (error) {
      console.log(error);
      throw new APIError(httpStatusCodes.Unauthorized, httpResponseMessages.WrongRefreshToken);
    }
  }
}