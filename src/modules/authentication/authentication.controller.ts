import { ConfigService } from '@nestjs/config';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Req, HttpException, HttpStatus, Ip } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SwaggerTags } from 'src/common/constants/swagger-tags.constant';
import { ControllerTagsConstant } from 'src/common/constants/controller-tags.constant';
import { ApiTags } from '@nestjs/swagger';
import { SignupAuthenticationDto } from './dto/signup-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { Request } from 'express';
import { CreateSessionDto } from '../sessions/dto/create-session.dto';

@ApiTags(SwaggerTags.AUTH)
@Controller({
  version: '1',
  path: ControllerTagsConstant.AUTHENTICATION
})
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);;

  constructor(private readonly authenticationService: AuthenticationService, private readonly configService: ConfigService) { }


  @Get()
  async findAll() {
    return await this.authenticationService.findAll();
  }

  @Post('signup')
  async signup(
    @Body() signupAuthenticationDto: SignupAuthenticationDto,
    @Body() createSessionDto: CreateSessionDto,
    @Req() request: Request,
    @Ip() ip: string) {
    // ! Get the agent and ip address from the request
    const agent = request.headers['user-agent'];


    createSessionDto.ip_address = ip;
    createSessionDto.user_agent = agent

    return await this.authenticationService.signup(signupAuthenticationDto, createSessionDto);
  }



  @Post('login')
  async login(
    @Body() loginAuthenticationDto: LoginAuthenticationDto,
    @Body() createSessionDto: CreateSessionDto,
    @Req() request: Request,
    @Ip() ip: string) {

    // ! Get the agent and ip address from the request
    const agent = request.headers['user-agent'];

    createSessionDto.ip_address = ip;
    createSessionDto.user_agent = agent

    return await this.authenticationService.login(loginAuthenticationDto, createSessionDto);
  }

  @Get()
  async testing() {
    return {
      message: 'Hello World',
      status: HttpStatus.OK
    }
  }
}
