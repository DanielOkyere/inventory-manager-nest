import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ObjectIdColumn,
} from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Expenditure {
  @ObjectIdColumn()
  id: number;

  @Column()
  expenditure_title: string;

  @Column()
  expenditure_amount: number;

  @Column(
    {nullable: true}
  )
  description: string;

  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;
}
