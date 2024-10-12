import { TodoType } from "./todos.type";


export type UserType = {
  id: number;
  email: string;
  name?: string;
  password: string;
  todos: TodoType[];
  verificationToken?: string;
  verified: boolean;
  refreshToken?: string;
  refreshTokenExpirationDate?: Date;
  changePasswordToken?: string;
  changePasswordTokenExpirationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}