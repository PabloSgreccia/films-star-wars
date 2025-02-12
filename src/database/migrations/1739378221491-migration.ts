import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Migration1739378221491 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const adminpass = await bcrypt.hash('adminpass', 10);
		const userpass = await bcrypt.hash('userpass', 10);

		await queryRunner.query(`
        INSERT INTO user (id, username, password, isAdmin) 
        VALUES 
        (1, 'Admin User', '${adminpass}', true),
        (2, 'Regular User', '${userpass}', false);
      `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        DELETE FROM user;
      `);
	}
}
