import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
      nullable:true
    })
    salt:string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: "boolean", default: true })
    isAdmin: boolean;
}
