import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

}
