export type TodoType = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
};
