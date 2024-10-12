import { AxiosRequestConfig } from 'axios';

import HttpService from './http.service';
import { TodoType } from '~/types/todos.type';

class TodoService extends HttpService {
  private readonly endpoint = 'todos';

  constructor() {
    super({});
  }

  public async getTodos(filters: string, withAuth: boolean = true): Promise<{ todos: TodoType[]; total: number; totalPages: number }> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/all?${filters}`,
    };
    return this.get<{ todos: TodoType[]; total: number; totalPages: number }>(config, withAuth);
  }

  public async getTodoById(id: string, withAuth: boolean = true): Promise<TodoType> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
    };
    return this.get<TodoType>(config, withAuth);
  }

  public async createTodo(todo: Omit<TodoType, 'id' | 'createdAt' | 'updatedAt'>, withAuth: boolean = true): Promise<TodoType> {
    const config: AxiosRequestConfig = {
      url: this.endpoint,
      data: todo,
    };
    return this.post<TodoType>(config, withAuth);
  }

  public async updateTodo(id: string, todo: Partial<TodoType>, withAuth: boolean = true): Promise<TodoType> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
      data: todo,
    };
    return this.put<TodoType>(config, withAuth);
  }

  public async deleteTodo(id: string, withAuth: boolean = true): Promise<void> {
    const config: AxiosRequestConfig = {
      url: `${this.endpoint}/${id}`,
    };
    await this.delete<void>(config, withAuth);
  }
}

export const todoService = new TodoService();
