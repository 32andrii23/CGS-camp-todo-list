import { UserType } from "./user.type";

export type TodoType = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  private: boolean;
  user: UserType;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
