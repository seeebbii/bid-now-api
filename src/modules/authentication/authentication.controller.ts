import { ConfigService } from '@nestjs/config';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SwaggerTags } from 'src/common/constants/swagger-tags.constant';
import { ControllerTagsConstant } from 'src/common/constants/controller-tags.constant';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(SwaggerTags.AUTH)
@Controller({
  version: '1',
  path: ControllerTagsConstant.AUTHENTICATION
})
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);;

  constructor(private readonly authenticationService: AuthenticationService, private readonly configService: ConfigService) { }

  @Post()
  register(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationService.register(createAuthenticationDto);
  }

  @Post('login')
  login() {
    return this.authenticationService.login();
  }

  @Get()
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
