import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739502027744 implements MigrationInterface {
    name = 'Migration1739502027744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`film\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`releaseDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`editedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited_by\` int NULL, \`created_by\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`star_wars_external_id\` ADD CONSTRAINT \`FK_953806606bb4fdc8d0a640233f6\` FOREIGN KEY (\`film_id\`) REFERENCES \`film\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD CONSTRAINT \`FK_7039726fdef97e827cf0c323c1d\` FOREIGN KEY (\`edited_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`film\` ADD CONSTRAINT \`FK_54993d8073e6c37638a34102c86\` FOREIGN KEY (\`created_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film\` DROP FOREIGN KEY \`FK_54993d8073e6c37638a34102c86\``);
        await queryRunner.query(`ALTER TABLE \`film\` DROP FOREIGN KEY \`FK_7039726fdef97e827cf0c323c1d\``);
        await queryRunner.query(`ALTER TABLE \`star_wars_external_id\` DROP FOREIGN KEY \`FK_953806606bb4fdc8d0a640233f6\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`DROP TABLE \`film\``);
    }

}
