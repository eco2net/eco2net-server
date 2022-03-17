import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EtatLieux } from "./EtatLieux.entity";


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    switchMembreConseil: Boolean;
    
    @Column()
    switchCCR: Boolean;

    @Column()
    switchAgentService: Boolean;

    @Column()
    nameSite: String;

    @Column()
    nameGuardian: String;

    @OneToMany(() => EtatLieux, etatlieux => etatlieux.report)
    listetatLieux: EtatLieux[]
}