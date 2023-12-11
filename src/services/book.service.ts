import { Repository } from 'typeorm';
import { Book } from '../db/entity/book.entity';

export class BookService {
  bookRepo: Repository<Book>;

  constructor(bookRepo: Repository<Book>) {
    this.bookRepo = bookRepo;
  }

  async get(bookId: number): Promise<Book | null> {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    return book;
  }

  async create(): Promise<string> {
    return '';
  }
}
