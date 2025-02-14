import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739542341380 implements MigrationInterface {
    name = 'Migration1739542341380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`editedAt\` \`editedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`editedAt\` \`editedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`film\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
    }

}
