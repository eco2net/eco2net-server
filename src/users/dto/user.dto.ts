import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {

    @IsNumber()
    @IsNotEmpty()
    id : number

    @IsString()
    @IsNotEmpty()
    login : string;

    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsBoolean()
    isAdmin : boolean
} 