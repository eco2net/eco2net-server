import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report.entity";

@Entity()
export class Attachements {

    constructor(
        name: String,
        originalName: String,
        path: String
    ) {
        this.name = name;
        this.originalName = originalName
        this.path = path
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    originalName: String;

    @Column()
    path: String;

    @ManyToOne(() => Report, report => report.attachements)
    report: Report
}