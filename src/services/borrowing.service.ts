import { BookRepository, BorrowerRepository, BorrowingRepository } from '../db';
import { ConflictError, NotFoundError, ValidationError } from '../errors';

import { Borrowing } from '../db/entity/borrowing.entity';
import { LessThan } from 'typeorm';
import { Paginated } from '../types';
import { injectable } from 'tsyringe';

@injectable()
export class BorrowingService {
  private pageSize = 10;

  private bookRepo: BookRepository;
  private borrowerRepo: BorrowerRepository;
  private borrowingRepo: BorrowingRepository;

  constructor(
    bookRepo: BookRepository,
    borrowerRepo: BorrowerRepository,
    borrowingRepo: BorrowingRepository
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
