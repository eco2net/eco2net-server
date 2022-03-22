import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
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

    @Column({default : 'User1'})
    user: String;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @OneToMany(() => EtatLieux, etatlieux => etatlieux.report)
    listetatLieux: EtatLieux[]

    @OneToMany(() => Attachements, attachement => attachement.report)
    attachements: Attachements[]
}