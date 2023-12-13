import { borrowingPayload, numericId, pageNumber } from '../validators';

import { BorrowingController } from '../controllers';
import { Router } from 'express';
import { container } from 'tsyringe';
import { validateRequest } from '../middleware';

export function setupRoutes() {
  const borrowingController = container.resolve(BorrowingController);

  const router = Router();

  router.get(
    '/',
    validateRequest(pageNumber, 'query'),
    borrowingController.get
  );

  router.get('/overdue', borrowingController.getOverdue);

  router.post(
    '/',
    validateRequest(borrowingPayload),
    borrowingController.create
  );

  router.delete(
    '/:id',
    validateRequest(numericId, 'params'),
    borrowingController.del
  );

  router.patch(
    '/:id/return',
    validateRequest(numericId, 'params'),
    borrowingController.update
  );

  return router;
}
