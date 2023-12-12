import { Book } from './entity/book.entity';
import { Borrower } from './entity/borrower.entity';
import { Borrowing } from './entity/borrowing.entity';
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
// a temp way to make sure repositeries are registered
// as dependencies before they are injected into controllers because TypeORM doesn't use classes
export function registerRepositories() {
  container.register<Repository<Book>>(Repository, {
    useValue: dataSource.getRepository(Book),
  });

  container.register<Repository<Borrower>>(Repository, {
    useValue: dataSource.getRepository(Borrower),
  });

  container.register<Repository<Borrowing>>(Repository, {
    useValue: dataSource.getRepository(Borrowing),
  });
}
