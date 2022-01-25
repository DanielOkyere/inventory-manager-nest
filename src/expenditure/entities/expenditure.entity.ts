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
  expenditure: string;

  @Column()
  expenditure_date: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user_id: number;
}
