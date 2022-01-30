import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column({
    nullable: true
  })
  salt:string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({type:'boolean',
  default: false})
  isAdmin: boolean;

  @Column()
  roles: string[];
}
