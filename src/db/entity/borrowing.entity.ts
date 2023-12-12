import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from './book.entity';
import { Borrower } from './borrower.entity';

export type BorrowStatus = 'out' | 'returned';

@Entity({ name: 'book_borrows' })
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'borrower_id' })
  borrower: Borrower;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({
    type: 'enum',
    enum: ['out', 'returned'],
    default: 'out',
  })
  status: BorrowStatus;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
