import { NextFunction, Request, Response } from 'express';

import { BookService } from '../services/book.service';

export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.bookService.get();
    return res.send(result);
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const book = await this.bookService.getById(id);

    if (!book) {
      return next({ status: 404, error: 'Not found' });
    }

    return res.send(book);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: payload } = req;
      const result = await this.bookService.create(payload);
      return res.status(201).send('OK');
    } catch (error) {
      console.log(error);
      return res.status(500).send('NOT OK :(');
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const payload = req.body;
    await this.bookService.update(id, payload);
    return res.send('OK');
  };

  del = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    await this.bookService.del(id);
    return res.send('OK');
  };
}
