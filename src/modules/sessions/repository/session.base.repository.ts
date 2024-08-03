import { Session } from "../entities/session.entity";

export abstract class SessionBaseRepository {

    abstract createSession(createSessionDto: any): Promise<Session | null>;

}