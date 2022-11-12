import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {

    constructor(
            code: String, 
            name : String,
            mail : String
        ) {
             this.code = code;
             this.name = name;
             this.mail = mail;
        }

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    code: String;

    @Column()
    name: String;

    @Column({ unique: true })
    mail: String;
}