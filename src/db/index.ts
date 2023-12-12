import { Book } from './entity/book.entity';
import { Borrower } from './entity/borrower.entity';
import { Borrowing } from './entity/borrowing.entity';
import { dataSource } from './data-source';

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
export const BookBorrowRepo = dataSource.getRepository(Borrowing);
