import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./report.entity";

@Entity()
export class Etatlieux {

    constructor(
        etatLieux: String, 
        etatLieuxDesc : String
        ) {
            this.etatLieux = etatLieux;
            this.etatLieuxDesc = etatLieuxDesc
        }

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    etatLieux: String;

    @Column()
    etatLieuxDesc: String;

    @ManyToOne(() => Report, report => report.listetatLieux)
    report : Report
}