import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EtatLieux } from "../entities/EtatLieux.entity";

export class ReportDto {

    @IsNumber()
    id: number;

    @IsBoolean()
    @IsNotEmpty()
    switchAgentService: Boolean;

    @IsBoolean()
    @IsNotEmpty()
    switchCCR: Boolean;

    @IsBoolean()
    @IsNotEmpty()
    switchMembreConseil: Boolean;

    @IsString()
    @IsNotEmpty()
    nameSite: String;

    @IsString()
    @IsNotEmpty()
    nameGuardian: String;

    @IsArray()
    listetatLieux: EtatLieux[]
}