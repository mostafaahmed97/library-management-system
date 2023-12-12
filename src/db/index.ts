import { Book, Borrower, Borrowing } from './entity';

import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { dataSource } from './data-source';

export async function initDbConnection() {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.log({ error });
    throw 'Failed to init DB connection';
  }
}

// TODO: improve this hack

/**
 *  A temp way to make sure repositeries are registered
 *  as dependencies before they are injected into controllers
 *  because of TypeORM limitations.
 *
 *  Whenever someone requests a BookRepository the container
 * returns the actual instance from TypeORM. Classes below
 * are for typing
 */

export class BookRepository extends Repository<Book> {}

export class BorrowerRepository extends Repository<Borrower> {}

export class BorrowingRepository extends Repository<Borrowing> {}

export async function registerRepositories() {
  container.register<BookRepository>(BookRepository, {
    useValue: dataSource.getRepository(Book),
  });

  container.register<BorrowerRepository>(BorrowerRepository, {
    useValue: dataSource.getRepository(Borrower),
  });

  container.register<BorrowingRepository>(BorrowingRepository, {
    useValue: dataSource.getRepository(Borrowing),
  });
}
