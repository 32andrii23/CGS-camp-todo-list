import { AxiosRequestConfig } from 'axios';

import HttpService from './http.service';
import { useUserStore } from '~store/user.store';
import { UserType } from '~/types/user.type';

class UserService extends HttpService {
  private readonly endpoint = 'user';

  constructor() {
    super({});
  }

  public async registerUser(user: Partial<UserType>): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/register`,
      data: user,
    };
    await this.post<void>(config);
  }

  public async loginUser(user: Partial<UserType>): Promise<{ accessToken: string, refreshToken: string, user: UserType }> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/login`,
      data: user,
    };
    const response = await this.post<{ accessToken: string, refreshToken: string, user: UserType }>(config);
    return response;
  }

  public async logoutUser(): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/logout`,
      data: { refreshToken: useUserStore.getState().refreshToken },
    };
    await this.post<void>(config);
  }

  public async getMe(): Promise<UserType> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/me`,
    };
    return this.get(config);
  }

  public async verifyUser(token: string): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/verify-email/${token}`,
    };
    await this.get(config);
  }

  public async forgotPassword(email: string): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/forgot-password`,
      data: { email },
    };
    await this.post<void>(config);
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/change-password`,
      data: { token, password },
    };
    await this.post<void>(config);
  }

  public async updateUser(data: Partial<UserType>, id: string): Promise<Partial<UserType>> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
      data,
    };
    const updatedUser = await this.put<UserType>(config);
    return updatedUser;
  }
}

export const userService = new UserService();
