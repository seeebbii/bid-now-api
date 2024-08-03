import { SignupAuthenticationDto } from './dto/signup-authentication.dto';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationRepository } from './repository/authentication.repository';
import { Authentication } from './entities/authentication.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from '../sessions/dto/create-session.dto';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common';
import { createResponse } from 'src/common/interceptors/wrapper/api-transform.wrapper';
import { SessionRepository } from '../sessions/repository/session.repository';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private authenticationRepository: AuthenticationRepository,
    private sessionRepository: SessionRepository
  ) { }


  async signup(
    signupAuthenticationDto: SignupAuthenticationDto,
    createSessionDto: CreateSessionDto): Promise<any> {

    // ! Check if the user already exists
    const user = await this.authenticationRepository.findByEmail(signupAuthenticationDto.email);

    // ! If the user exists, return null
    if (user) {
      return createResponse({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: 'User already exists',
      });
    }

    // ! Check if the phone number already exists
    const phoneNumber = await this.authenticationRepository.findByPhoneNumber(signupAuthenticationDto.country_code, signupAuthenticationDto.phone_number);

    // ! If the phone number exists, return null
    if (phoneNumber) {
      return createResponse({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: 'Phone number already exists',
      });
    }

    try {

      // ! Hash the password
      const salt = await this.authenticationRepository.genSalt();
      const hashedPassword = await this.authenticationRepository.hashPassword(signupAuthenticationDto.password, salt);

      signupAuthenticationDto.password = hashedPassword;
      const createdUser = await this.authenticationRepository.signup(signupAuthenticationDto, createSessionDto);

      // ! Create a new session
      const createdSession = await this.sessionRepository.createSession(createSessionDto);
      createdSession.authentication = createdUser;
      await this.sessionRepository.save(createdSession);

      // Create a copy of the createdUser object without the circular reference
      // const userResponse = { ...createdUser, sessions: createdSession };

      // this.logger.debug(createdSession);

      return createResponse({
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        // data: userResponse,
      });

    } catch (errors) {

      this.logger.error(errors);
      return createResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An error occurred while creating the user",
        errors: errors
      });

    }

  }




}
