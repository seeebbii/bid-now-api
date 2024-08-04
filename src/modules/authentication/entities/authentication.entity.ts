import { Session } from "src/modules/sessions/entities/session.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, BaseEntity, AfterLoad } from "typeorm";
import { Role } from "../dto/signup-authentication.dto";
import { Exclude } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Authentication extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    email: string;

    @Column({ select: true })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ type: 'enum', enum: [Role.ADMIN, Role.USER], default: Role.ADMIN })
    role: Role;

    @Column({ type: 'text' })
    country_code: string;

    @Column({ type: 'text' })
    phone_number: string;

    @OneToMany(() => Session, session => session.authentication)
    sessions: Session[];

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;


    constructor(partial: Partial<Authentication>) {
        super();
        Object.assign(this, partial);
    }

    // ! Method to check if the user is an admin
    isAdmin(): boolean {
        return this.role === Role.ADMIN;
    }


    // ! Method to check if the user is a user
    isUser(): boolean {
        return this.role === Role.USER;
    }

}
