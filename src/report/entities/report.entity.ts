import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { etatLieux } from "./etatLieux.entity";


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id : Number;

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

    @Column(() => etatLieux)
    listetatLieux: etatLieux[]
}