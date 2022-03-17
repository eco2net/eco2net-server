import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report.entity";

@Entity()
export class EtatLieux {

    @PrimaryGeneratedColumn()
    id: Number; 

    @Column()
    etatLieux: String;

    @Column()
    etatLieuxDesc: String;

    @ManyToOne(() => Report, report => report.listetatLieux)
    report : Report
}