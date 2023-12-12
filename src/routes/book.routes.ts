import { bookPayload, numericId, optionalBookPayload } from '../validators';

import { BookController } from '../controllers/book.controller';
import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../middleware';

export function setupRoutes() {
  const bookController = container.resolve(BookController);

  const router = Router();

  router.get('/', bookController.get);

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
