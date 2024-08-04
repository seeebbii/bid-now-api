import { CreateSessionDto } from "src/modules/sessions/dto/create-session.dto";
import { SignupAuthenticationDto } from "../dto/signup-authentication.dto";
import { Authentication } from "../entities/authentication.entity";
import { LoginAuthenticationDto } from "../dto/login-authentication.dto";

export abstract class AuthenticationBaseRepository {

    abstract findAll(): Promise<Authentication[] | null>;

    abstract findByEmail(email: string): Promise<Authentication | null>;

    abstract findByPhoneNumber(countryCode: string, phoneNumber: string): Promise<Authentication | null>;

    abstract signup(signupAuthenticationDto: SignupAuthenticationDto): Promise<Authentication | null>;

    abstract login(loginAuthenticationDto: LoginAuthenticationDto): Promise<Authentication | null>;

}