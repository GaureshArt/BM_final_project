import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeInBid1745992862224 implements MigrationInterface {
    name = 'ChangeInBid1745992862224'

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`ALTER TABLE \`bid\` ADD CONSTRAINT \`FK_df7bbfd8e0fd698f38589361912\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bid\` ADD CONSTRAINT \`FK_bfde5a03e8655884abb27140dab\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
       }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bid\` DROP FOREIGN KEY \`FK_bfde5a03e8655884abb27140dab\``);
        await queryRunner.query(`ALTER TABLE \`bid\` DROP FOREIGN KEY \`FK_df7bbfd8e0fd698f38589361912\``);
        await queryRunner.query(`ALTER TABLE \`bid_negotiation\` DROP FOREIGN KEY \`FK_9fceac577df8cf56a868d20e8bb\``);
        await queryRunner.query(`ALTER TABLE \`bid_negotiation\` DROP FOREIGN KEY \`FK_93442bef654c46cfe519eb5dd23\``);
        await queryRunner.query(`DROP TABLE \`bid\``);
        await queryRunner.query(`DROP TABLE \`bid_negotiation\``);
        
    }

}
