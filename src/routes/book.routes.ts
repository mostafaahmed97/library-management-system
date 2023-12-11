import { Book } from '../db/entity/book.entity';
import { BookController } from '../controllers/book.controlller';
import { BookService } from '../services/book.service';
import { Router } from 'express';
import { createBook } from '../validators';
import { dataSource } from '../db/data-source';
import { validateRequest } from '../middleware';

const bookRepo = dataSource.getRepository(Book);
const bookService = new BookService(bookRepo);
const bookController = new BookController(bookService);

const router = Router();

router.get('/', bookController.get);
router.get('/:id', bookController.getById);
router.post('/', validateRequest(createBook), bookController.create);
router.patch('/:id', bookController.update);
router.delete('/:id', bookController.del);

export default router;
