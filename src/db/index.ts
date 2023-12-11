import { dataSource } from './data-source';

import { Book } from './entity/book.entity';
import { Borrower } from './entity/borrower.entity';
import { BookBorrow } from './entity/book-borrow.entity';

export async function initDbConnection() {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.log({ error });
    throw 'Failed to init DB connection';
  }
}

export const BookRepo = dataSource.getRepository(Book);
export const BorrowerRepo = dataSource.getRepository(Borrower);
export const BookBorrowRepo = dataSource.getRepository(BookBorrow);
