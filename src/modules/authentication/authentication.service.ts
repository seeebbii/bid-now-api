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
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { instanceToPlain } from 'class-transformer';
import { take } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private authenticationRepository: AuthenticationRepository,
    private sessionRepository: SessionRepository
  ) { }

  async findAll(): Promise<any> {
    try {
      const users = await this.authenticationRepository.findAll();

      return createResponse({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      });

    } catch (error) {
      this.logger.error(error);
      return createResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while retrieving the users',
        errors: error
      });
    }

    return;
  }



  async signup(
    signupAuthenticationDto: SignupAuthenticationDto,
    createSessionDto: CreateSessionDto): Promise<any> {
    // ! Create an array to hold errors
    let errors = [];

    // ! Check if the user already exists
    const user = await this.authenticationRepository.findByEmail(signupAuthenticationDto.email);

    // ! If the user exists, return null
    if (user) {
      errors.push({ email: ['Email is already in use'] });
    }

    // ! Check if the phone number already exists
    const phoneNumber = await this.authenticationRepository.findByPhoneNumber(signupAuthenticationDto.country_code, signupAuthenticationDto.phone_number);

    // ! If the phone number exists, return null
    if (phoneNumber) {
      errors.push({ phone_number: ['Phone number is already in use'] });
    }

    // If there are any errors, return the response
    if (errors.length > 0) {
      const formattedErrors = errors.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      return createResponse({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        message: 'Error creating user',
        errors: formattedErrors,
      });
    }

    try {

      // ! Hash the password
      const salt = await this.authenticationRepository.genSalt();
      const hashedPassword = await this.authenticationRepository.hashPassword(signupAuthenticationDto.password, salt);

      signupAuthenticationDto.password = hashedPassword;
      const createdUser = await this.authenticationRepository.signup(signupAuthenticationDto);

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

    } catch (error) {

      this.logger.error(error);
      return createResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An error occurred while creating the user",
        errors: error
      });

    }

  }

  async login(
    loginAuthenticationDto: LoginAuthenticationDto,
    createSessionDto: CreateSessionDto,
  ): Promise<any> {

    try {

      const auth = await this.authenticationRepository.login(loginAuthenticationDto);

      if (!auth) {
        return createResponse({
          success: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invalid email or password',
        });
      }

      // ! Compare the password

      const isPasswordValid = await this.authenticationRepository.comparePassword(loginAuthenticationDto.password, auth.password);
      if (!isPasswordValid) {
        return createResponse({
          success: false,
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid email or password',
        });
      }

      // Create a session against the user that just logged in
      const createdSession = await this.sessionRepository.createSession(createSessionDto);
      createdSession.authentication = auth;
      await this.sessionRepository.save(createdSession);
      await this.authenticationRepository.save(auth);


      return createResponse({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully',
        data: auth,
      });

    } catch (error) {
      this.logger.error(error);
      return createResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while logging in',
        errors: error
      });
    }
  }


}
