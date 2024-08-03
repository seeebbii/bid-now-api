import { DataSource, Repository } from "typeorm";
import { Authentication } from "../entities/authentication.entity";
import { AuthenticationBaseRepository } from "./authentication.base.repoository";
import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { SignupAuthenticationDto } from "../dto/signup-authentication.dto";
import { createResponse } from "src/common/interceptors/wrapper/api-transform.wrapper";
import { ConfigService } from "@nestjs/config";
import { CreateSessionDto } from "src/modules/sessions/dto/create-session.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthenticationRepository extends Repository<Authentication> implements AuthenticationBaseRepository {
    private readonly logger = new Logger(AuthenticationRepository.name);

    constructor(private dataSource: DataSource, private readonly configService: ConfigService) {
        super(Authentication, dataSource.createEntityManager());
    }

    async findByEmail(email: string): Promise<Authentication | null> {
        return await this.findOne({ where: { email: email } }) || null;
    }

    async findByPhoneNumber(countryCode: string, phoneNumber: string): Promise<Authentication | null> {
        return await this.findOne({ where: { country_code: countryCode, phone_number: phoneNumber } }) || null;
    }


    async signup(signupAuthenticationDto: SignupAuthenticationDto, createSessionDto: CreateSessionDto): Promise<Authentication> | null {
        const userCreated = await this.save(signupAuthenticationDto);
        return userCreated;
    }


    async genSalt(): Promise<string> {
        return await bcrypt.genSalt(+this.configService.get<number>('HASHING_SALT_ROUNDS'));
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

}