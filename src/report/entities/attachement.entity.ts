import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report.entity";

@Entity()
export class Attachements {

    constructor(
        name: String,
        originalName: String
    ) {
        this.name = name;
        this.originalName = originalName
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    originalName: String;

    @ManyToOne(() => Report, report => report.attachements)
    report: Report
}