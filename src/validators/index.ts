import { Book } from '../db/entity/book.entity';
import { Borrower } from '../db/entity/borrower.entity';
import Joi from 'joi';

export const bookPayload = Joi.object<Book>({
  title: Joi.string().required(),
  isbn: Joi.string().required(),
  quantity: Joi.number().positive().required(),
  location: Joi.string().required(),
});

export const optionalBookPayload = Joi.object<Book>({
  title: Joi.string().optional(),
  isbn: Joi.string().optional(),
  quantity: Joi.number().optional(),
  location: Joi.string().optional(),
});

export const numericId = Joi.object({
  id: Joi.number().required(),
});

export const borrowerPayload = Joi.object<Borrower>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const optionalBorrowerPayload = Joi.object<Borrower>({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
});

export const borrowingPayload = Joi.object({
  bookId: Joi.number().required(),
  borrowerId: Joi.number().required(),
  dueDate: Joi.date().greater('now').required(),
});
