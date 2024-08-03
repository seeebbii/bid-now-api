import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionRepository } from './repository/session.repository';
import { createResponse } from 'src/common/interceptors/wrapper/api-transform.wrapper';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(
    private sessionServiceRepository: SessionRepository
  ) {

  }

  async createSession(createSessionDto: CreateSessionDto) {

    try {
      // ! Create a new session
      const createdSession = await this.sessionServiceRepository.createSession(createSessionDto);

      return createResponse({
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Session created successfully',
        data: createdSession,
      });

    } catch (errors) {

      this.logger.error(errors);
      return createResponse({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An error occurred while creating the session",
        errors: errors
      });

    }
  }

}
