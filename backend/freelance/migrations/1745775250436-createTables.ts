import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1745775250436 implements MigrationInterface {
    name = 'CreateTables1745775250436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0f49a593960360f6f85b692aca\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('client', 'freelancer') NOT NULL, \`bio\` varchar(255) NULL, \`profileImageUrl\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bid_negotiation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`proposedAmount\` decimal NULL, \`proposedDurationDays\` int NULL, \`message\` text NULL, \`sentAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`bidId\` int NULL, \`senderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bid\` (\`id\` int NOT NULL AUTO_INCREMENT, \`initialAmount\` decimal NOT NULL, \`initialDurationDays\` int NOT NULL, \`finalAmount\` decimal NOT NULL, \`finalDurationDays\` int NOT NULL, \`initialMessage\` text NOT NULL, \`status\` enum ('open', 'negotiate', 'accepted') NOT NULL DEFAULT 'open', \`freelancerId\` int NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`budget\` decimal NOT NULL, \`deadline\` date NOT NULL, \`clientId\` int NULL, \`assignedFreelancerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_public_message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` text NOT NULL, \`attachmentUrl\` varchar(255) NULL, \`isParentMessage\` tinyint NOT NULL DEFAULT 1, \`IsUpdated\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`project_id\` int NULL, \`user_id\` int NULL, \`parent_message_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_private_message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` text NOT NULL, \`attachmentUrl\` varchar(255) NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`IsUpdated\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`project_id\` int NULL, \`sender_id\` int NULL, \`receiver_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`milestone\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`dueDate\` date NOT NULL, \`amount\` decimal NOT NULL, \`isCompleted\` tinyint NOT NULL DEFAULT 0, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data\` text NULL, \`isRead\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` decimal NOT NULL, \`isPaid\` tinyint NOT NULL DEFAULT 0, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`milestoneId\` int NULL, UNIQUE INDEX \`REL_636a9b9d953f99a2431586b5fc\` (\`milestoneId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_skill\` (\`userId\` int NOT NULL, \`skillId\` int NOT NULL, INDEX \`IDX_03260daf2df95f4492cc8eb00e\` (\`userId\`), INDEX \`IDX_49db81d31fc330a905af3c0120\` (\`skillId\`), PRIMARY KEY (\`userId\`, \`skillId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_category\` (\`projectId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_1d5cb5254bc78e09cb3cbde123\` (\`projectId\`), INDEX \`IDX_37ecc11e0897c93df535771a9d\` (\`categoryId\`), PRIMARY KEY (\`projectId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bid_negotiation\` ADD CONSTRAINT \`FK_93442bef654c46cfe519eb5dd23\` FOREIGN KEY (\`bidId\`) REFERENCES \`bid\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bid_negotiation\` ADD CONSTRAINT \`FK_9fceac577df8cf56a868d20e8bb\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bid\` ADD CONSTRAINT \`FK_df7bbfd8e0fd698f38589361912\` FOREIGN KEY (\`freelancerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bid\` ADD CONSTRAINT \`FK_bfde5a03e8655884abb27140dab\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_816f608a9acf4a4314c9e1e9c66\` FOREIGN KEY (\`clientId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_373f840e435eb66afea985c6bc1\` FOREIGN KEY (\`assignedFreelancerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_public_message\` ADD CONSTRAINT \`FK_39ae44f6d4caa788e226f721c4d\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_public_message\` ADD CONSTRAINT \`FK_675e71d8d725f34405908ca7d06\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_public_message\` ADD CONSTRAINT \`FK_9efc70e8f4743d282fbb0ef5180\` FOREIGN KEY (\`parent_message_id\`) REFERENCES \`project_public_message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_private_message\` ADD CONSTRAINT \`FK_d7c6df914e5b5677116e6a1bb81\` FOREIGN KEY (\`project_id\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_private_message\` ADD CONSTRAINT \`FK_3ce4bd6ba7fd6bfea58a323f1b7\` FOREIGN KEY (\`sender_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_private_message\` ADD CONSTRAINT \`FK_1ccb0476b9b39e6e5d874e8b368\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`milestone\` ADD CONSTRAINT \`FK_edc28a2e0442554afe5eef2bdcb\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_928b7aa1754e08e1ed7052cb9d8\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_636a9b9d953f99a2431586b5fc5\` FOREIGN KEY (\`milestoneId\`) REFERENCES \`milestone\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_skill\` ADD CONSTRAINT \`FK_03260daf2df95f4492cc8eb00e6\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_skill\` ADD CONSTRAINT \`FK_49db81d31fc330a905af3c01205\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_category\` ADD CONSTRAINT \`FK_1d5cb5254bc78e09cb3cbde123d\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_category\` ADD CONSTRAINT \`FK_37ecc11e0897c93df535771a9de\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_category\` DROP FOREIGN KEY \`FK_37ecc11e0897c93df535771a9de\``);
        await queryRunner.query(`ALTER TABLE \`project_category\` DROP FOREIGN KEY \`FK_1d5cb5254bc78e09cb3cbde123d\``);
        await queryRunner.query(`ALTER TABLE \`user_skill\` DROP FOREIGN KEY \`FK_49db81d31fc330a905af3c01205\``);
        await queryRunner.query(`ALTER TABLE \`user_skill\` DROP FOREIGN KEY \`FK_03260daf2df95f4492cc8eb00e6\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_636a9b9d953f99a2431586b5fc5\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_928b7aa1754e08e1ed7052cb9d8\``);
        await queryRunner.query(`ALTER TABLE \`milestone\` DROP FOREIGN KEY \`FK_edc28a2e0442554afe5eef2bdcb\``);
        await queryRunner.query(`ALTER TABLE \`project_private_message\` DROP FOREIGN KEY \`FK_1ccb0476b9b39e6e5d874e8b368\``);
        await queryRunner.query(`ALTER TABLE \`project_private_message\` DROP FOREIGN KEY \`FK_3ce4bd6ba7fd6bfea58a323f1b7\``);
        await queryRunner.query(`ALTER TABLE \`project_private_message\` DROP FOREIGN KEY \`FK_d7c6df914e5b5677116e6a1bb81\``);
        await queryRunner.query(`ALTER TABLE \`project_public_message\` DROP FOREIGN KEY \`FK_9efc70e8f4743d282fbb0ef5180\``);
        await queryRunner.query(`ALTER TABLE \`project_public_message\` DROP FOREIGN KEY \`FK_675e71d8d725f34405908ca7d06\``);
        await queryRunner.query(`ALTER TABLE \`project_public_message\` DROP FOREIGN KEY \`FK_39ae44f6d4caa788e226f721c4d\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_373f840e435eb66afea985c6bc1\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_816f608a9acf4a4314c9e1e9c66\``);
        await queryRunner.query(`ALTER TABLE \`bid\` DROP FOREIGN KEY \`FK_bfde5a03e8655884abb27140dab\``);
        await queryRunner.query(`ALTER TABLE \`bid\` DROP FOREIGN KEY \`FK_df7bbfd8e0fd698f38589361912\``);
        await queryRunner.query(`ALTER TABLE \`bid_negotiation\` DROP FOREIGN KEY \`FK_9fceac577df8cf56a868d20e8bb\``);
        await queryRunner.query(`ALTER TABLE \`bid_negotiation\` DROP FOREIGN KEY \`FK_93442bef654c46cfe519eb5dd23\``);
        await queryRunner.query(`DROP INDEX \`IDX_37ecc11e0897c93df535771a9d\` ON \`project_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_1d5cb5254bc78e09cb3cbde123\` ON \`project_category\``);
        await queryRunner.query(`DROP TABLE \`project_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_49db81d31fc330a905af3c0120\` ON \`user_skill\``);
        await queryRunner.query(`DROP INDEX \`IDX_03260daf2df95f4492cc8eb00e\` ON \`user_skill\``);
        await queryRunner.query(`DROP TABLE \`user_skill\``);
        await queryRunner.query(`DROP INDEX \`REL_636a9b9d953f99a2431586b5fc\` ON \`invoice\``);
        await queryRunner.query(`DROP TABLE \`invoice\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`milestone\``);
        await queryRunner.query(`DROP TABLE \`project_private_message\``);
        await queryRunner.query(`DROP TABLE \`project_public_message\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`bid\``);
        await queryRunner.query(`DROP TABLE \`bid_negotiation\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f49a593960360f6f85b692aca\` ON \`skill\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
    }

}
