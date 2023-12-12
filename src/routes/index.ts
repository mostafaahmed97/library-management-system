import { Router } from 'express';
import bookRoutes from './book.routes';
import borrowerRoutes from './borrower.routes';
import borrowingRoutes from './borrowing.routes';

const router = Router();

router.use('/books', bookRoutes);
router.use('/borrowers', borrowerRoutes);
router.use('/borrowings', borrowingRoutes);

export default router;
