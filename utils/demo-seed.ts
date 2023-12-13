/**
 * A script to populate database with fake
 * values for demo purposes. Not meant for
 * production
 *
 * NOTE: This clears any previous data in db.
 */

import { Book, Borrower, Borrowing } from '../src/db/entity';

import { dataSource } from '../src/db/data-source';
import { faker } from '@faker-js/faker';
import { initDbConnection } from '../src/db';

async function seedDb() {
  await initDbConnection();

  const bookRepo = dataSource.getRepository(Book);
  const borrowerRepo = dataSource.getRepository(Borrower);
  const borrowingRepo = dataSource.getRepository(Borrowing);

  await borrowingRepo.delete({});
  await borrowerRepo.delete({});
  await bookRepo.delete({});

  const books: Omit<Book, 'id' | 'createdAt'>[] = faker.helpers.multiple(
    () => ({
      title: faker.lorem.words({ min: 1, max: 5 }),
      author: faker.person.fullName(),
      isbn: faker.commerce.isbn(),
      location: faker.location.ordinalDirection({ abbreviated: true }),
      quantity: faker.number.int({ min: 0, max: 50 }),
    }),
    { count: 20 }
  );

  await bookRepo.insert(books);

  const users: Omit<Borrower, 'id' | 'createdAt'>[] = faker.helpers.multiple(
    () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }),
    { count: 20 }
  );

  await borrowerRepo.insert(users);
}

seedDb();
