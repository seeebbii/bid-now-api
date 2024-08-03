import { Session } from './entities/session.entity';
import { Authentication } from './../authentication/entities/authentication.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Req, Ip, ParseIntPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SwaggerTags } from 'src/common/constants/swagger-tags.constant';
import { ControllerTagsConstant } from 'src/common/constants/controller-tags.constant';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@ApiTags(SwaggerTags.SESSION)
@Controller({
  version: '1',
  path: ControllerTagsConstant.SESSIONS
})
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);;

  constructor(private readonly sessionsService: SessionsService, private readonly configService: ConfigService) { }

  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto, @Req() request: Request, @Ip() ip: string) {

    // ! Get the agent and ip address from the request
    const agent = request.headers['user-agent'];

    createSessionDto.ip_address = ip;
    createSessionDto.user_agent = agent

    return await this.sessionsService.createSession(createSessionDto);
  }


  @Get('user/:id')
  async getUserSessions(@Param('id') id: string) {

  }

}
