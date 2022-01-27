import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Expenditure {
  @PrimaryGeneratedColumn()
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
