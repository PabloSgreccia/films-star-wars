import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Migration1739655086769 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const adminpass = await bcrypt.hash('Admin123', 10);
		const userpass = await bcrypt.hash('User123', 10);

		await queryRunner.query(`
        INSERT INTO user (id, username, password, isAdmin) 
        VALUES 
        (1, 'AdminUser', '${adminpass}', true),
        (2, 'RegularUser', '${userpass}', false);
      `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        DELETE FROM user;
      `);
	}
}
