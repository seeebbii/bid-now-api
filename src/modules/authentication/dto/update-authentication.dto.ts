import { SignupAuthenticationDto } from './signup-authentication.dto';
import { PartialType } from '@nestjs/swagger';


export class UpdateAuthenticationDto extends PartialType(SignupAuthenticationDto) { }
