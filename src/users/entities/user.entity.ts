import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    lastUpdate: Date;
}
