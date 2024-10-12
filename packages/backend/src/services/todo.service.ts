import { Prisma, PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

export default class TodoService {
	async findAll(filters: { userId: number, search?: string, status?: string, page?: number, size?: number }): Promise<{ todos: Todo[], total: number }> {
		const { userId, search, status, page = 1, size = 10 } = filters;

		const skip = (page - 1) * size;

		const statusFilter = status
			? {
					...(status === 'private' && { private: true, userId }),
					...(status === 'public' && { private: false }), 
					...(status === 'completed' && { completed: true }),
					...(status === '' && {}),
				}
			: {};

		const whereConditions = {
			OR: [
				{ private: false },
				{ 
					private: true,
					userId,
				},
			],
			...(search && { title: { contains: search, mode: 'insensitive' as Prisma.QueryMode } }),
			...statusFilter
		};

		const todos =  await prisma.todo.findMany({
      where: whereConditions,
			take: size,
			skip,
			orderBy: {
				createdAt: 'desc',
			},
    });
		const total = await prisma.todo.count({ where: whereConditions });

		return { todos, total };
	}

	async findById(id: string, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({
			where: { id: Number(id) },
		});

		if (!todo) {
			return null;
		}
		if(todo.private && todo.userId !== userId) {
			return null;
		}

		return todo;
	}

	async create(data: Omit<Todo, "id" | "userId" | "createdAt" | "updatedAt">, userId: number): Promise<Todo> {
		const todo = await prisma.todo.create({
			data: {
				...data,
				userId,
			} 
		});

		return todo;
	}

	async update(id: string, data: Partial<Todo>, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({
			where: { id: Number(id) },
		})

		if (!todo) {
			return null;
		}
		if(todo.userId !== userId) {
			return null;
		}

		return await prisma.todo.update({
			where: { id: Number(id) },
			data: {
				...data,
				updatedAt: new Date(),
			},
		});
	}

	async delete(id: string, userId: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({
			where: { id: Number(id) },
		});

		if (!todo) {
			return null;
		}
		if(todo.userId !== userId) {
			return null;
		}

		return await prisma.todo.delete({
			where: { id: Number(id) },
		});
	}
}
