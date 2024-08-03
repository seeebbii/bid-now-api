import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export class SignupAuthenticationDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;

    @ApiProperty()
    @IsEnum(Role)
    @IsOptional()
    role?: Role;

    @ApiProperty()
    @IsNotEmpty()
    country_code: string;

    @ApiProperty()
    @IsNotEmpty()
    phone_number: string;
}