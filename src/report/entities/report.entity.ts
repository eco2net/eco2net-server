import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attachements } from "./attachement.entity";
import { EtatLieux } from "./EtatLieux.entity";



@Entity()
export class Report {

    constructor(
        switchMembreConseil: Boolean,
        switchCCR: Boolean,
        switchAgentService: Boolean,
        nameSite: String,
        nameGuardian: String
    ) {
        this.switchMembreConseil = switchMembreConseil;
        this.switchCCR = switchCCR;
        this.switchAgentService = switchAgentService;
        this.nameSite = nameSite;
        this.nameGuardian = nameGuardian;
    }


    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToMany(() => Attachements, attachement => attachement.report)
    attachements: Attachements[]
}