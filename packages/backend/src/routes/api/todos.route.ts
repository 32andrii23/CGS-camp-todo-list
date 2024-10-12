import { Router } from 'express';

import todoController from '@/controllers/todo.controller';
import tryCatch from '@/middlewares/tryCatch.middleware';
import isExist from '@/middlewares/isExist.middleware';
import { validate } from '@/middlewares/validator.middleware';
import { createTodoSchema, updateTodoSchema } from '@/validations/todo.validation';
import { isVerified, resourceOwnershipAuthorization } from '@/middlewares/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get(
  '/all', 
  tryCatch(todoController.getAllTodos.bind(todoController))
);

todosRouter.get(
  '/:todoId', 
  isExist('todo'), 
  tryCatch(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
  '/', 
  isVerified,
  validate(createTodoSchema),
  tryCatch(todoController.createTodo.bind(todoController))
);

todosRouter.put(
  '/:todoId', 
  isVerified,
  resourceOwnershipAuthorization,
  isExist('todo'), 
  validate(updateTodoSchema),
  tryCatch(todoController.updateTodo.bind(todoController))
);

todosRouter.delete(
  '/:todoId', 
  isVerified,
  resourceOwnershipAuthorization,
  isExist('todo'), 
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
