import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Attachements } from "./attachement.entity";
import { Etatlieux } from "./etatlieux.entity";
import User from "./user.entity";

@Entity()
export class Report {

    constructor(
        switchMembreConseil: Boolean,
        switchCCR: Boolean,
        switchAgentService: Boolean,
        nameSite: String,
        nameGuardian: String,
        user: String
    ) {
        this.switchMembreConseil = switchMembreConseil;
        this.switchCCR = switchCCR;
        this.switchAgentService = switchAgentService;
        this.nameSite = nameSite;
        this.nameGuardian = nameGuardian;
        this.user = user
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

    @Column()
    userId : number;

    @ManyToOne(() => User, (user) => user.report)
    user: String;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @OneToMany(() => Etatlieux, etatlieux => etatlieux.report)
    listetatLieux: Etatlieux[]

    @OneToMany(() => Attachements, attachement => attachement.report)
    attachements: Attachements[]
}