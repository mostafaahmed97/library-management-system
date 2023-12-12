import { ConflictError, NotFoundError, ValidationError } from '../errors';
import { LessThan, Repository } from 'typeorm';

import { Book } from '../db/entity/book.entity';
import { Borrower } from '../db/entity/borrower.entity';
import { Borrowing } from '../db/entity/borrowing.entity';
import { Paginated } from '../types';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class BorrowingService {
  private pageSize = 10;

  private bookRepo: Repository<Book>;
  private borrowerRepo: Repository<Borrower>;
  private borrowingRepo: Repository<Borrowing>;

  constructor(
    bookRepo: Repository<Book>,
    borrowerRepo: Repository<Borrower>,
    borrowingRepo: Repository<Borrowing>
  ) {
    this.bookRepo = bookRepo;
    this.borrowerRepo = borrowerRepo;
    this.borrowingRepo = borrowingRepo;
  }

  async get(page = 1): Promise<Paginated<Borrowing>> {
    if (!page) page = 1;

    const [borrowers, total] = await this.borrowingRepo.findAndCount({
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      relations: ['book', 'borrower'],
    });

    return {
      data: borrowers,
      limit: this.pageSize,
      page,
      total,
    };
  }

  async getOverdue(page = 1): Promise<Paginated<Borrowing>> {
    if (!page) page = 1;

    const [borrowers, total] = await this.borrowingRepo.findAndCount({
      where: {
        status: 'out',
        dueDate: LessThan(new Date()),
      },
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
      relations: ['book', 'borrower'],
    });

    return {
      data: borrowers,
      limit: this.pageSize,
      page,
      total,
    };
  }

  async getActiveBorrowings(borrowerId: number) {
    const borrowings = await this.borrowingRepo.find({
      where: { borrower: { id: borrowerId }, status: 'out' },
      relations: ['book'],
    });

    return borrowings;
  }

  async create(bookId: number, borrowerId: number, dueDate: string) {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    if (book.quantity <= 0) {
      throw new ConflictError('Not enough copies');
    }

    const borrower = await this.borrowerRepo.findOne({
      where: { id: borrowerId },
    });

    if (!borrower) {
      throw new NotFoundError('Borrower not found');
    }

    let date: Date;
    try {
      date = new Date(dueDate);
    } catch (error) {
      throw new ValidationError('Invalid due date');
    }

    await this.bookRepo.decrement({ id: book.id }, 'quantity', 1);
    await this.borrowingRepo.insert({
      dueDate: date,
      borrower,
      book,
    });
  }

  async return(id: number) {
    const borrowing = await this.borrowingRepo.findOne({
      where: { id: id },
    });

    if (!borrowing) throw new NotFoundError('Borrowing not found');

    if (borrowing.status == 'out')
      await this.bookRepo.increment({ id: borrowing.book.id }, 'quantity', 1);

    await this.borrowingRepo.update(id, {
      status: 'returned',
    });
  }

  async del(id: number) {
    const borrowing = await this.borrowingRepo.findOne({
      where: { id: id },
      relations: ['book'],
    });

    if (!borrowing) throw new NotFoundError('Borrowing not found');

    if (borrowing.status == 'out')
      await this.bookRepo.increment({ id: borrowing.book.id }, 'quantity', 1);

    await this.borrowingRepo.delete(id);
  }
}
