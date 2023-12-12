import { NextFunction, Request, Response } from 'express';

import { BorrowerService } from '../services/borrower.service';

export class BorrowerController {
  private borrowerService: BorrowerService;

  constructor(borrowerService: BorrowerService) {
    this.borrowerService = borrowerService;
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.borrowerService.get();
    return res.send(result);
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const book = await this.borrowerService.getById(id);

    if (!book) {
      return next({ status: 404, error: 'Not found' });
    }

    return res.send(book);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.borrowerService.create(req.body);
      return res.status(201).send('OK');
    } catch (error) {
      console.log(error);
      return res.status(500).send('NOT OK :(');
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const payload = req.body;
    await this.borrowerService.update(id, payload);
    return res.send('OK');
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    await this.borrowerService.del(id);
    return res.send('OK');
  };
}
