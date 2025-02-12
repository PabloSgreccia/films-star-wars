import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1739310008748 implements MigrationInterface {
  name = 'Migration1739310008748';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('\n\n\nCORRIENDO LA MIGRACION\n\n\n');

    await queryRunner.query(
      `CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`usuario\``);
  }
}
