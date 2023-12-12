import { bookPayload, numericId, optionalBookPayload } from '../validators';

import { Book } from '../db/entity/book.entity';
import { BookController } from '../controllers/book.controller';
import { BookService } from '../services/book.service';
import { Router } from 'express';
import { dataSource } from '../db/data-source';
import { validateRequest } from '../middleware';

const bookRepo = dataSource.getRepository(Book);
const bookService = new BookService(bookRepo);
const bookController = new BookController(bookService);

const router = Router();

router.get('/', bookController.get);
router.get(
  '/:id',
  validateRequest(numericId, 'params'),
  bookController.getById
);
router.post('/', validateRequest(bookPayload), bookController.create);
router.delete('/:id', validateRequest(numericId, 'params'), bookController.del);
router.patch(
  '/:id',
  validateRequest(numericId, 'params'),
  validateRequest(optionalBookPayload),
  bookController.update
);

export default router;
