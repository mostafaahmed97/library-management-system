import {
  borrowerPayload,
  numericId,
  optionalBorrowerPayload,
} from '../validators';

import { BorrowerController } from '../controllers';
import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../middleware';

export function setupRoutes() {
  const router = Router();
  const borrowerController = container.resolve(BorrowerController);

  router.get('/', borrowerController.get);

  router.get(
    '/:id',
    validateRequest(numericId, 'params'),
    borrowerController.getById
  );

  router.get(
    '/:id/active-borrowings',
    validateRequest(numericId, 'params'),
    borrowerController.getActiveBorrowings
  );

  router.post('/', validateRequest(borrowerPayload), borrowerController.create);

  router.delete(
    '/:id',
    validateRequest(numericId, 'params'),
    borrowerController.del
  );

  router.patch(
    '/:id',
    validateRequest(numericId, 'params'),
    validateRequest(optionalBorrowerPayload),
    borrowerController.update
  );

  return router;
}
