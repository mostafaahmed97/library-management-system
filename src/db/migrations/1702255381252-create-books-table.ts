import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrations1702255381252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'isbn', type: 'varchar', isNullable: false },
          { name: 'quantity', type: 'int', isNullable: false },
          { name: 'location', type: 'varchar', isNullable: false },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
