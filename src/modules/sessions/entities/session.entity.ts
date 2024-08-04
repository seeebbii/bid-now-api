import { Authentication } from "src/modules/authentication/entities/authentication.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Session {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column({ type: 'varchar', nullable: true })
    device_id: string;

    @Column({ type: 'varchar', nullable: true })
    ip_address: string;

    @Column({ type: 'varchar', nullable: true })
    user_agent: string;

    @Column({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    last_access: Date;

    @Column({ nullable: true, })
    fcm_token: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @ManyToOne(() => Authentication, Authentication => Authentication.sessions)
    @JoinColumn({ name: 'authentication_id' })
    authentication: Authentication;
}
