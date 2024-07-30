import { DataSource, Repository } from "typeorm";
import { Authentication } from "../entities/authentication.entity";
import { AuthenticationBaseRepository } from "./authentication.base.repoository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticationRepository extends Repository<Authentication> implements AuthenticationBaseRepository {


    constructor(private dataSource: DataSource) {
        super(Authentication, dataSource.createEntityManager());
    }

}