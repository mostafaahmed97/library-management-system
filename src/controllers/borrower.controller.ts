import { NextFunction, Request, Response } from 'express';

import { BorrowerService } from '../services/borrower.service';
import { BorrowingService } from '../services/borrowing.service';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class BorrowerController {
  private borrowerService: BorrowerService;
  private borrowingService: BorrowingService;

  constructor(
    borrowerService: BorrowerService,
    borrowingService: BorrowingService
  ) {
    this.borrowerService = borrowerService;
    this.borrowingService = borrowingService;
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const pageNum = page ? parseInt(page) : 1;

      const result = await this.borrowerService.get(pageNum);
      return res.send(result);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const book = await this.borrowerService.getById(id);
      return res.send(book);
    } catch (error) {
      return next(error);
    }
  };

  getActiveBorrowings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = parseInt(req.params.id);
      const book = await this.borrowingService.getActiveBorrowings(id);
      return res.send(book);
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.borrowerService.create(req.body);
      return res.status(201).send('OK');
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const payload = req.body;
      await this.borrowerService.update(id, payload);
      return res.send('OK');
    } catch (error) {
      return next(error);
    }
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.borrowerService.del(id);
      return res.send('OK');
    } catch (error) {
      return next(error);
    }
  };
}
