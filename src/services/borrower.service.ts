import { NotFoundError, ResourceExistsError } from '../errors';
import { autoInjectable, injectable } from 'tsyringe';

import { Borrower } from '../db/entity/borrower.entity';
import { BorrowerRepository } from '../db';
import { Paginated } from '../types';
import { Repository } from 'typeorm';

@autoInjectable()
export class BorrowerService {
  private pageSize = 10;
  private borrowerRepo: BorrowerRepository;

  constructor(borrowerRepo: BorrowerRepository) {
    this.borrowerRepo = borrowerRepo;
  }

  async get(page = 1): Promise<Paginated<Borrower>> {
    if (!page) page = 1;

    const [borrowers, total] = await this.borrowerRepo.findAndCount({
      take: this.pageSize,
      skip: (page - 1) * this.pageSize,
    });

    return {
      data: borrowers,
      limit: this.pageSize,
      page,
      total,
    };
  }

  async getById(id: number): Promise<Borrower | null> {
    const borrower = await this.borrowerRepo.findOne({ where: { id: id } });
    if (!borrower) throw new NotFoundError('Borrower not found');
    return borrower;
  }

  async create(payload: Omit<Borrower, 'id' | 'createdAt'>) {
    const isEmailRegistered = await this.borrowerRepo.findOne({
      where: { email: payload.email },
    });

    if (isEmailRegistered)
      throw new ResourceExistsError('Email already registered !');

    await this.borrowerRepo.insert({
      name: payload.name,
      email: payload.email,
    });
  }

  async update(id: number, payload: Partial<Borrower>) {
    const borrower = await this.borrowerRepo.findOne({ where: { id: id } });
    if (!borrower) throw new NotFoundError('Borrower not found');

    await this.borrowerRepo.update(id, payload);
  }

  async del(id: number) {
    const borrower = await this.borrowerRepo.findOne({ where: { id: id } });
    if (!borrower) throw new NotFoundError('Borrower not found');

    await this.borrowerRepo.delete(id);
  }
}
