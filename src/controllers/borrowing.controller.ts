import { NextFunction, Request, Response } from 'express';

import { BorrowingService } from '../services/borrowing.service';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class BorrowingController {
  private bookBorrowService: BorrowingService;

  constructor(bookBorrowService: BorrowingService) {
    this.bookBorrowService = bookBorrowService;
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const pageNum = page ? parseInt(page) : 1;

      const result = await this.bookBorrowService.get(pageNum);
      return res.send(result);
    } catch (error) {
      return next(error);
    }
  };

  getOverdue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookBorrowService.getOverdue();
      return res.send(result);
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId, borrowerId, dueDate } = req.body;
      await this.bookBorrowService.create(bookId, borrowerId, dueDate);
      return res.status(201).send('OK');
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.bookBorrowService.return(id);
      return res.send('OK');
    } catch (error) {
      return next(error);
    }
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.bookBorrowService.del(id);
      return res.send('OK');
    } catch (error) {
      return next(error);
    }
  };
}
