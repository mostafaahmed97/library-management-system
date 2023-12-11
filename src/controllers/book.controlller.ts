import { Request, Response } from 'express';

import { BookService } from '../services/book.service';

export class BookController {
  bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  async get(req: Request, res: Response) {
    return res.send('Getting your book');
  }

  async getById(req: Request, res: Response) {
    return res.send(`Getting id ${req.params.id}`);
  }

  async create(req: Request, res: Response) {
    console.log({ body: req.body, query: req.query, params: req.params });
  }

  async update(req: Request, res: Response) {
    return res.send(`Patching id ${req.params.id}`);
  }

  async del(req: Request, res: Response) {
    return res.send(`Deleting id ${req.params.id}`);
  }
}
