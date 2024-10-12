import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(3).max(500).optional(),
  completed: Joi.boolean().optional(),
  private: Joi.boolean().optional()
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(50).optional(),
  description: Joi.string().min(3).max(500).optional(),
  completed: Joi.boolean().optional(),
  private: Joi.boolean().optional(),
});