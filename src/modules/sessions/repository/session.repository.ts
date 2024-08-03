import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from "typeorm";
import { Session } from "../entities/session.entity";
import { SessionBaseRepository } from "./session.base.repository";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionRepository extends Repository<Session> implements SessionBaseRepository {

    private readonly Logger = new Logger(SessionRepository.name);

    constructor(
        private dataSource: DataSource,
        private readonly configService: ConfigService
    ) {
        super(Session, dataSource.createEntityManager());
    }


    async createSession(createSessionDto: any): Promise<Session | null> {
        return await this.save(createSessionDto);
    }

}