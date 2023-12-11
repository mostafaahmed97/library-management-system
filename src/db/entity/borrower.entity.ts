import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'borrowers' })
export class Borrower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    name: 'created_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
