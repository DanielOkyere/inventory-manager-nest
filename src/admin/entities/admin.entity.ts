import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class Admin {
    @ObjectIdColumn()
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
