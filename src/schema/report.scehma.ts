import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { etatLieux } from "src/report/entities/etatLieux.entity";

export type ReportDocument = Report & Document

@Schema()
export class Report {

    @Prop()
    switchMembreConseil: Boolean;

    @Prop()
    switchCCR: Boolean;

    @Prop()
    switchAgentService: Boolean;

    @Prop()
    nameSite: String;

    @Prop()
    nameGuardian: String;

    @Prop([etatLieux])
    listetatLieux: etatLieux[]
}

export const ReportScehma = SchemaFactory.createForClass(Report);