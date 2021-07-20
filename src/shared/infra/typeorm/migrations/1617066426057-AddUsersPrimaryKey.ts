import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUsersPrimaryKey1617066426057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.updatePrimaryKeys('users', [
      new TableColumn({ name: 'id', type: 'varchar' }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropPrimaryKey('users');
  }
}
