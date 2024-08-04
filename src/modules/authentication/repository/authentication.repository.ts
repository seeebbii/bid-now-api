import { DataSource, Repository } from "typeorm";
import { Authentication } from "../entities/authentication.entity";
import { AuthenticationBaseRepository } from "./authentication.base.repoository";
import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { SignupAuthenticationDto } from "../dto/signup-authentication.dto";
import { createResponse } from "src/common/interceptors/wrapper/api-transform.wrapper";
import { ConfigService } from "@nestjs/config";
import { CreateSessionDto } from "src/modules/sessions/dto/create-session.dto";
import * as bcrypt from 'bcrypt';
import { LoginAuthenticationDto } from "../dto/login-authentication.dto";
import { instanceToInstance, instanceToPlain } from "class-transformer";


@Injectable()
export class AuthenticationRepository extends Repository<Authentication> implements AuthenticationBaseRepository {
    private readonly logger = new Logger(AuthenticationRepository.name);

    constructor(private dataSource: DataSource, private readonly configService: ConfigService) {
        super(Authentication, dataSource.createEntityManager());
    }

    async findAll(): Promise<Authentication[]> {
        const users = await this.find({ relations: ['sessions',] });
        return users;
    }

    async findByEmail(email: string): Promise<Authentication | null> {
        return await this.findOne({ where: { email: email }, relations: ['sessions'] }) || null;
    }

    async findByPhoneNumber(countryCode: string, phoneNumber: string): Promise<Authentication | null> {
        return await this.findOne({ where: { country_code: countryCode, phone_number: phoneNumber } }) || null;
    }


    async signup(signupAuthenticationDto: SignupAuthenticationDto): Promise<Authentication> | null {
        const userCreated = await this.save(signupAuthenticationDto);
        return userCreated;
    }

    // async getRecentUserSession(userId: string): Promise<Authentication | null> {

    //  }

    async login(loginAuthenticationDto: LoginAuthenticationDto): Promise<Authentication> | null {
        const user = await this.findByEmail(loginAuthenticationDto.email,);

        if (!user) {
            console.dir(user)
            return null;
        }

        return user;
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async genSalt(): Promise<string> {
        return await bcrypt.genSalt(+this.configService.get<number>('HASHING_SALT_ROUNDS'));
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }



}