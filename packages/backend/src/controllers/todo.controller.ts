import { Response, Request, NextFunction } from 'express';

import TodoService from '@/services/todo.service';
import httpStatusCodes from '@/consts/status-codes';
import httpResponseMessages from '@/consts/response-messages';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodos(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const {
				search,
				status,
				page,
				size,
			} = req.query;
			
			const user = JSON.parse(req.headers.user as string);
			const userId = user.id;
			
			const filters = {
				userId,
				search: search as string,
				status: status as string,
				page: page ? Number(page) : 1,
				size: size ? Number(size) : 10,
			}

			const { todos, total } = await this.todoService.findAll(filters);

			res.status(httpStatusCodes.OK).json({
				todos,
				total,
				totalPages: Math.ceil(total / filters.size || 10),
			});
		} catch (error) {
			next(error);
		}
	}

	async getTodoById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {			
			const { todoId } = req.params;
			const user = JSON.parse(req.headers.user as string);
			const userId = user.id;

			const todo = await this.todoService.findById(todoId, userId);

			res.status(httpStatusCodes.OK).json(todo);
		} catch (error) {
			next(error);
		}
	}

	async createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const user = JSON.parse(req.headers.user as string);
			const userId = user.id;

			const todo = await this.todoService.create(req.body, userId);

			res.status(httpStatusCodes.Created).json(todo);
		} catch (error) {
			next(error);
		}
	}

	async updateTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { todoId } = req.params;
			const user = JSON.parse(req.headers.user as string);
			const userId = user.id;

			const todo = await this.todoService.update(todoId, req.body, userId);

			res.status(httpStatusCodes.OK).json(todo);
		} catch (error) {
			next(error);
		}
	}

	async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { todoId } = req.params;
			const user = JSON.parse(req.headers.user as string);
			const userId = user.id;

			await this.todoService.delete(todoId, userId);
			
			res.status(httpStatusCodes.OK).json({
				message: httpResponseMessages.Deleted,
			});
		} catch (error) {
			next(error);
		}
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
