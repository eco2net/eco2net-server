import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Users {

@PrimaryGeneratedColumn()
id : number;

@Column()
firstName: string;

@Column()
lastName: string;

@Column({unique: true})
email: string

@Column()
password: string

@Column({ default: true })
isActive: boolean;

}
