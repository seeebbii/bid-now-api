import { Authentication } from "../entities/authentication.entity";

export abstract class AuthenticationBaseRepository {

    abstract findByEmail(email: string): Promise<Authentication | null>;

    abstract findByPhoneNumber(countryCode: string, phoneNumber: string): Promise<Authentication | null>;

    abstract signup(signupAuthenticationDto: any, createSessionDto: any): Promise<Authentication | null>;

}