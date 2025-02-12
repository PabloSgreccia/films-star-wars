import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739378221491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO usuario (id, nombre, email, password) 
        VALUES 
        (1, 'Admin User', 'admin@example.com', 'adminpass'),
        (2, 'Regular User', 'user@example.com', 'userpass');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM usuario WHERE email IN ('admin@example.com', 'user@example.com');
      `);
  }
}
