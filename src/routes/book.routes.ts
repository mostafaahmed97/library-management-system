import {
  bookPayload,
  numericId,
  optionalBookPayload,
  pageNumber,
} from '../validators';

import { BookController } from '../controllers/book.controller';
import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../middleware';

export function setupRoutes() {
  const bookController = container.resolve(BookController);

  const router = Router();

  router.get('/', validateRequest(pageNumber, 'query'), bookController.get);

  router.get('/search', bookController.search);

  router.get(
    '/:id',
    validateRequest(numericId, 'params'),
    bookController.getById
  );
  router.post('/', validateRequest(bookPayload), bookController.create);

  router.delete(
    '/:id',
    validateRequest(numericId, 'params'),
    bookController.del
  );

  router.patch(
    '/:id',
    validateRequest(numericId, 'params'),
    validateRequest(optionalBookPayload),
    bookController.update
  );

  return router;
}
