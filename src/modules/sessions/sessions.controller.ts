import { Session } from './entities/session.entity';
import { Authentication } from './../authentication/entities/authentication.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SwaggerTags } from 'src/common/constants/swagger-tags.constant';
import { ControllerTagsConstant } from 'src/common/constants/controller-tags.constant';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags(SwaggerTags.SESSION)
@Controller({
  version: '1',
  path: ControllerTagsConstant.SESSIONS
})
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);;

  constructor(private readonly sessionsService: SessionsService, private readonly configService: ConfigService) { }

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
