import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { etatLieux } from "../entities/etatLieux.entity";

export class ReportDto {

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
    listetatLieux: etatLieux[]
}