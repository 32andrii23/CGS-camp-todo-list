import { create } from 'zustand';
import { httpResponseMessages, todoStoreResponseMessages } from '~shared/response-messages';
import { TodoType } from '~/types/todos.type';
import { todoService } from '~shared/services/todo.service';

interface TodoStore {
  todos: TodoType[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  getTodos: (filters?: string, append?: boolean) => Promise<string>;
  getTodoById: (id: string) => Promise<string>;
  createTodo: (todo: Partial<TodoType>) => Promise<string>;
  updateTodo: (id: string, data: Partial<TodoType>) => Promise<string>;
  deleteTodo: (id: string) => Promise<string>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  total: 0,
  totalPages: 0,
  isLoading: false,
  error: null,

  getTodos: async (filters?: string, append?: boolean): Promise<string> => {
    set({ isLoading: true });
    try {
      const { todos, total, totalPages } = await todoService.getTodos(filters);
      set((state) => ({
        todos: append ? [...state.todos, ...todos] : todos,
        total,
        totalPages,
        isLoading: false,
      }))
      return todoStoreResponseMessages.getTodos.success;
    } catch (error) {
      set({ error: httpResponseMessages.FETCH_ERROR, isLoading: false });
      return todoStoreResponseMessages.getTodos.error;
    }
  },

  getTodoById: async (id: string): Promise<string> => {
    set({ isLoading: true });
    try {
      const todo = await todoService.getTodoById(id);
      set((state) => ({ todos: [...state.todos, todo] }));
      return todoStoreResponseMessages.getTodoById.success;
    } catch (error) {
      set({ error: httpResponseMessages.FETCH_ERROR });
      return todoStoreResponseMessages.getTodoById.error;
    } finally {
      set({ isLoading: false });
    }
  },

  createTodo: async (todo: Omit<TodoType, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    set({ isLoading: true });
    try {
      const newTodo = await todoService.createTodo(todo);
      set((state) => ({ todos: [...state.todos, newTodo] }));
      return todoStoreResponseMessages.createTodo.success;
    } catch (error) {
      set({ error: httpResponseMessages.ADD_ERROR });
      return todoStoreResponseMessages.createTodo.error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateTodo: async (id: string, data: Partial<TodoType>): Promise<string> => {
    set({ isLoading: true });
    try {
      const updatedTodo = await todoService.updateTodo(id, data);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
      }));
      return todoStoreResponseMessages.updateTodo.success;
    } catch (error) {
      set({ error: httpResponseMessages.UPDATE_ERROR });
      return todoStoreResponseMessages.updateTodo.error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTodo: async (id: string): Promise<string> => {
    set({ isLoading: true });
    try {
      await todoService.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
      return todoStoreResponseMessages.deleteTodo.success;
    } catch (error) {
      set({ error: httpResponseMessages.DELETE_ERROR });
      return todoStoreResponseMessages.deleteTodo.error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
