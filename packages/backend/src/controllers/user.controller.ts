import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";

import { JwtTokens } from "@/auth/jwt-tokens.util";
import httpResponseMessages from "@/consts/response-messages";
import httpStatusCodes from "@/consts/status-codes";
import UserService from "@/services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);

      res.status(httpStatusCodes.Created).json(user);
    } catch (error) {
      next(error);
    }
  }
  
  async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      
      const user = await this.userService.loginUser(email, password);
      
      const { accessToken, refreshToken } = JwtTokens.generateTokens(user.id.toString());
      
      await this.userService.updateRefreshToken(refreshToken, user.id.toString());

      res.status(httpStatusCodes.OK).json({ accessToken, refreshToken, user });
    } catch (error) {
      next(error);
    }
  }
  
  async logoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;

      await this.userService.logoutUser(refreshToken);

      res.status(httpStatusCodes.OK).json({ message: httpResponseMessages.Logout });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = JSON.parse(req.headers.user as string);
      const userId = user.id;
      const userRecieved = await this.userService.getUser(userId);

      res.status(httpStatusCodes.OK).json(userRecieved);
    } catch (error) {
      next(error);
    }
  }

  async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { verificationToken } = req.params;

      await this.userService.verifyUser(verificationToken);

      res.status(httpStatusCodes.OK).json(httpResponseMessages.UserVerified);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      await this.userService.forgotPassword(email);

      res.status(httpStatusCodes.OK).json({ message: httpResponseMessages.ForgotPassword });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, password } = req.body;

      await this.userService.changePassword(token, password);

      res.status(httpStatusCodes.OK).json({ message: httpResponseMessages.ChangePassword });
    } catch (error) {
      next(error);
    }
  }

  async updateRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      
      const userId = await JwtTokens.verifyRefreshToken(refreshToken);
      
      const { refreshToken: newRefreshToken } = JwtTokens.generateTokens(userId);
      
      await this.userService.updateRefreshToken(newRefreshToken, userId);
      
      res.status(httpStatusCodes.OK).json({ refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = JSON.parse(req.headers.user as string);
      const userId = user.id;
      
      const updatedUser = await this.userService.updateUser(userId, req.body);
      
      res.status(httpStatusCodes.OK).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController(new UserService());
export default userController;
