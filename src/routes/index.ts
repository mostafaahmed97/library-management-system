import { Router } from 'express';
import bookRoutes from './book.routes';
import borrowerRoutes from './borrower.routes';

const router = Router();

router.use('/books', bookRoutes);
router.use('/borrowers', borrowerRoutes);

export default router;
