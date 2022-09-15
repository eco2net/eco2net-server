import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import {User} from "src/entities/user.entity";
import { Etatlieux } from "../../entities/etatlieux.entity";

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

    @IsNumber()
    @IsNotEmpty()
    userId : number;

    @IsArray()
    listetatLieux: Etatlieux[]
}