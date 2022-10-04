import { MigrationInterface, QueryRunner } from 'typeorm';

export class addChatAndEvent1664911984276 implements MigrationInterface {
  name = 'addChatAndEvent1664911984276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`day\` int NOT NULL, \`month\` int NOT NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`chats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`telegramId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e84405ad20d7ebfe79269ad67d\` (\`telegramId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`events\` ADD CONSTRAINT \`FK_c627ba93d1810827cbb9d58fbfb\` FOREIGN KEY (\`chatId\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`events\` DROP FOREIGN KEY \`FK_c627ba93d1810827cbb9d58fbfb\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e84405ad20d7ebfe79269ad67d\` ON \`chats\``,
    );
    await queryRunner.query(`DROP TABLE \`chats\``);
    await queryRunner.query(`DROP TABLE \`events\``);
  }
}
