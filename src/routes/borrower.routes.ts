import { Book, Borrower, Borrowing } from '../db/entity';
import { BorrowerService, BorrowingService } from '../services';
import {
  borrowerPayload,
  numericId,
  optionalBorrowerPayload,
} from '../validators';

import { BorrowerController } from '../controllers';
import { Router } from 'express';
import { dataSource } from '../db/data-source';
import { validateRequest } from '../middleware';

const bookRepo = dataSource.getRepository(Book);
const borrowerRepo = dataSource.getRepository(Borrower);
const borrowingRepo = dataSource.getRepository(Borrowing);

const borrowerService = new BorrowerService(borrowerRepo);
const borrowingService = new BorrowingService(
  bookRepo,
  borrowerRepo,
  borrowingRepo
);

const borrowerController = new BorrowerController(
  borrowerService,
  borrowingService
);

const router = Router();

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

export default router;
