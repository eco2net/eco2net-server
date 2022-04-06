import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./report.entity";

@Entity()
export class Attachements {

    constructor(
        originalName: String,
        path: String,
        key: String
    ) {
        this.originalName = originalName
        this.path = path
        this.key = key
    }

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    originalName: String;

    @Column()
    path: String;

    @Column()
    key: String

    @ManyToOne(() => Report, report => report.attachements)
    report: Report
}