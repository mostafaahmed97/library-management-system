import {
  borrowerPayload,
  numericId,
  optionalBorrowerPayload,
} from '../validators';

import { Borrower } from '../db/entity/borrower.entity';
import { BorrowerController } from '../controllers/borrower.controller';
import { BorrowerService } from '../services/borrower.service';
import { Router } from 'express';
import { dataSource } from '../db/data-source';
import { validateRequest } from '../middleware';

const borrowerRepo = dataSource.getRepository(Borrower);
const borrowerService = new BorrowerService(borrowerRepo);
const borrowerController = new BorrowerController(borrowerService);

const router = Router();

router.get('/', borrowerController.get);

router.get(
  '/:id',
  validateRequest(numericId, 'params'),
  borrowerController.getById
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
