import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReportDto {

    @IsNumber()
    id: Number;

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
    listetatLieux: []
}