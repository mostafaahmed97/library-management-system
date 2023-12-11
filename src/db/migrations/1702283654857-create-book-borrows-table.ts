import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrations1702283654857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'book_borrows',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'borrower_id', type: 'int', isNullable: false },
          { name: 'book_id', type: 'int', isNullable: false },
          {
            name: 'status',
            type: 'enum',
            enum: ['out', 'returned'],
            isNullable: false,
            // Workaround for issue with escaping default enum in TypeORM
            default: `'out'`,
          },
          { name: 'due_date', type: 'date', isNullable: false },
          {
            name: 'created_at',
            type: 'date',
            isNullable: false,
            default: 'NOW()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'book_borrows',
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedTableName: 'books',
        referencedColumnNames: ['id'],
      })
    );

    await queryRunner.createForeignKey(
      'book_borrows',
      new TableForeignKey({
        columnNames: ['borrower_id'],
        referencedTableName: 'borrowers',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('book_borrows');
  }
}
