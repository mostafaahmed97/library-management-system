import { Book, Borrower, Borrowing } from '../db/entity';
import { borrowingPayload, numericId } from '../validators';

import { BookBorrowingController } from '../controllers';
import { BorrowingService } from '../services';
import { Router } from 'express';
import { dataSource } from '../db/data-source';
import { validateRequest } from '../middleware';

const bookRepo = dataSource.getRepository(Book);
const borrowerRepo = dataSource.getRepository(Borrower);
const borrowingRepo = dataSource.getRepository(Borrowing);

const borrowingService = new BorrowingService(
  bookRepo,
  borrowerRepo,
  borrowingRepo
);

const borrowingController = new BookBorrowingController(borrowingService);

const router = Router();

router.get('/', borrowingController.get);

router.get('/overdue', borrowingController.getOverdue);

router.post('/', validateRequest(borrowingPayload), borrowingController.create);

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

export default router;
