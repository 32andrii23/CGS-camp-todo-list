import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserType } from "~/types/user.type";
import { httpResponseMessages, userStoreResponseMessages } from "~shared/response-messages";
import { userService } from "~shared/services/user.service";

interface UserState {
  user: UserType | null;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  isAuthenticated: boolean;
  register: (user: Partial<UserType>) => Promise<string>;
  login: (user: Partial<UserType>) => Promise<string>;
  logout: () => Promise<string>;
  getMe: () => Promise<string>;
  verifyUser: (token: string) => Promise<string>;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, newPassword: string) => Promise<string>;
  updateUser: (data: Partial<UserType>, id: string) => Promise<string>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      accessToken: null,
      async setAccessToken(accessToken: string) {
        set({ accessToken });
      },
      refreshToken: null,
      async setRefreshToken(refreshToken: string) {
        set({ refreshToken });
      },
      isAuthenticated: false,
      async register(user: Partial<UserType>) {
        set({ isLoading: true, error: null });
        try {
          await userService.registerUser(user);
          return userStoreResponseMessages.register.success;
        } catch (error) {
          set({ error: httpResponseMessages.REGISTER_ERROR });
          return userStoreResponseMessages.register.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async login(user: Partial<UserType>) {
        set({ isLoading: true, error: null });
        try {
          const { accessToken, refreshToken, user: returnedUser } = await userService.loginUser(user);
          set({ accessToken, refreshToken, user: returnedUser, isAuthenticated: true });
          return userStoreResponseMessages.login.success;
        } catch (error) {
          set({ error: httpResponseMessages.LOGIN_ERROR });
          return userStoreResponseMessages.login.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async logout() {
        set({ isLoading: true, error: null });
        try {
          set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null });
          await userService.logoutUser();
          return userStoreResponseMessages.logout.success;
        } catch (error) {
          set({ error: httpResponseMessages.LOGOUT_ERROR });
          return userStoreResponseMessages.logout.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async getMe() {
        set({ isLoading: true, error: null });
        try {
          const user = await userService.getMe();
          set({ user });
          return userStoreResponseMessages.getMe.success;
        } catch (error) {
          set({ error: httpResponseMessages.FETCH_ERROR });
          return userStoreResponseMessages.getMe.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async verifyUser(token: string) {
        set({ isLoading: true, error: null });
        try {
          await userService.verifyUser(token);
          set({ isAuthenticated: true });
          return userStoreResponseMessages.verifyUser.success;
        } catch (error) {
          set({ error: httpResponseMessages.VERIFY_ERROR });
          return userStoreResponseMessages.verifyUser.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async forgotPassword(email: string) {
        set({ isLoading: true, error: null });
        try {
          await userService.forgotPassword(email);
          return userStoreResponseMessages.forgotPassword.success;
        } catch (error) {
          set({ error: httpResponseMessages.FORGOT_PASSWORD_ERROR });
          return userStoreResponseMessages.forgotPassword.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async resetPassword(token: string, newPassword: string) {
        set({ isLoading: true, error: null });
        try {
          await userService.resetPassword(token, newPassword);
          return userStoreResponseMessages.resetPassword.success;
        } catch (error) {
          set({ error: httpResponseMessages.RESET_PASSWORD_ERROR });
          return userStoreResponseMessages.resetPassword.error;
        } finally {
          set({ isLoading: false });
        }
      },
      async updateUser(data: Partial<UserType>, id: string) {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await userService.updateUser(data, id);
          set({ user: updatedUser as UserType });
          return userStoreResponseMessages.updateUser.success;
        } catch (error) {
          set({ error: httpResponseMessages.UPDATE_ERROR });
          return userStoreResponseMessages.updateUser.error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    } 
  )
)