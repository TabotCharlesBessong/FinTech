import Joi from 'joi';

export const userSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').default('user'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  update: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8),
  }),
};

export const transactionSchemas = {
  create: Joi.object({
    amount: Joi.number().required(),
    type: Joi.string().valid('income', 'expense').required(),
    categoryId: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
  }),

  update: Joi.object({
    amount: Joi.number(),
    type: Joi.string().valid('income', 'expense'),
    categoryId: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
  }),
};

export const categorySchemas = {
  create: Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid('income', 'expense').required(),
    description: Joi.string(),
  }),

  update: Joi.object({
    name: Joi.string(),
    type: Joi.string().valid('income', 'expense'),
    description: Joi.string(),
  }),
}; 