import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1722502786555 implements MigrationInterface {
    name = 'InitialMigrations1722502786555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authentication" ("id" BIGSERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" bigint, CONSTRAINT "REL_14d3fad63d55c6050959ea1300" UNIQUE ("user_id"), CONSTRAINT "PK_684fcb9924c8502d64b129cc8b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" BIGSERIAL NOT NULL, "device_id" character varying, "ip_address" character varying, "user_agent" character varying, "last_access" TIMESTAMP WITH TIME ZONE, "fcm_token" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "authentication_id" bigint, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "authentication" ADD CONSTRAINT "FK_14d3fad63d55c6050959ea1300c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_ebe971f636ad3ec9ee2faccb5a1" FOREIGN KEY ("authentication_id") REFERENCES "authentication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_ebe971f636ad3ec9ee2faccb5a1"`);
        await queryRunner.query(`ALTER TABLE "authentication" DROP CONSTRAINT "FK_14d3fad63d55c6050959ea1300c"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "authentication"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
