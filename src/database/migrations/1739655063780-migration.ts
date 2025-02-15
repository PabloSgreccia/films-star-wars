import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739655063780 implements MigrationInterface {
    name = 'Migration1739655063780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`star_wars_external_id\` (\`external_id\` int NOT NULL, \`filmId\` int NULL, UNIQUE INDEX \`REL_553db514806d3d9ddd60c894ad\` (\`filmId\`), PRIMARY KEY (\`external_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`releaseDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`editedAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`editedBy\` int NULL, \`createdBy\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`star_wars_external_id\` ADD CONSTRAINT \`FK_553db514806d3d9ddd60c894ad6\` FOREIGN KEY (\`filmId\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD CONSTRAINT \`FK_0148b03369570358b4d98d37506\` FOREIGN KEY (\`editedBy\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD CONSTRAINT \`FK_f73fee2afaefd88026c6bee6978\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` DROP FOREIGN KEY \`FK_f73fee2afaefd88026c6bee6978\``);
        await queryRunner.query(`ALTER TABLE \`film\` DROP FOREIGN KEY \`FK_0148b03369570358b4d98d37506\``);
        await queryRunner.query(`ALTER TABLE \`star_wars_external_id\` DROP FOREIGN KEY \`FK_553db514806d3d9ddd60c894ad6\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`film\``);
        await queryRunner.query(`DROP INDEX \`REL_553db514806d3d9ddd60c894ad\` ON \`star_wars_external_id\``);
        await queryRunner.query(`DROP TABLE \`star_wars_external_id\``);
    }

}
