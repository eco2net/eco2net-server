import {IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {

    @IsString()
    @IsNotEmpty()
    login : string;

    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsEmail()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;

    @IsBoolean()
    isAdmin : boolean
} 