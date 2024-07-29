import { Session } from "src/modules/sessions/entities/session.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Authentication {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Session, session => session.authentication)
    sessions: Session[];

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;


}
