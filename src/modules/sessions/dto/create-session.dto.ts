import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";


export class CreateSessionDto {

    @ApiProperty()
    @IsNotEmpty()
    device_id: string;

    @ApiProperty()
    ip_address: string;

    @ApiProperty()
    user_agent: string;


    @ApiProperty()
    @IsNotEmpty()
    fcm_token: string;

}
