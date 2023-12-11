import Joi from 'joi';

export const bookPayload = Joi.object({
  title: Joi.string().required(),
  isbn: Joi.string().required(),
  quantity: Joi.number().positive().required(),
  location: Joi.string().required(),
});

export const optionalBookPayload = Joi.object({
  title: Joi.string().optional(),
  isbn: Joi.string().optional(),
  quantity: Joi.number().optional(),
  location: Joi.string().optional(),
});

export const bookId = Joi.object({
  id: Joi.number().required(),
});
