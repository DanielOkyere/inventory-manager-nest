import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Region {
    @ObjectIdColumn()
    id: number;

    @Column()
    country: string;

    @Column()
    state: string;

    @Column()
    province: string;

    @Column()
    address: string;
}
