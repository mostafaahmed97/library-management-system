import { autoInjectable, container, inject } from 'tsyringe';

import { Book } from '../db/entity/book.entity';
import { BookRepository } from '../db';
import { NotFoundError } from '../errors';
import { Paginated } from '../types';

@autoInjectable()
export class BookService {
  private pageSize = 10;
  private bookRepo: BookRepository;

  constructor(bookRepo: BookRepository) {
    console.log('FROM BOOK SERVICE ->>>> GOT THE INJECTED REPO', { bookRepo });
    console.log('CONTAINER', { container });

    this.bookRepo = bookRepo;
  }

  async get(page = 1): Promise<Paginated<Book>> {
    if (!page) page = 1;

    const [books, total] = await this.bookRepo.findAndCount({
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
    });

    return {
      data: books,
      limit: this.pageSize,
      page,
      total,
    };
  }

  async getById(bookId: number): Promise<Book | null> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundError('Book not found');
    return book;
  }

  async create(payload: Omit<Book, 'id' | 'created_at'>) {
    await this.bookRepo.insert({
      title: payload.title,
      isbn: payload.isbn,
      quantity: payload.quantity,
      location: payload.location,
    });
  }

  async update(bookId: number, payload: Partial<Book>) {
    let book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundError('Book not found');
    await this.bookRepo.update(bookId, payload);
  }

  async del(bookId: number) {
    let book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundError('Book not found');
    await this.bookRepo.delete(bookId);
  }
}
