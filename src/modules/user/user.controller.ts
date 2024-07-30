import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/common/constants/swagger-tags.constant';
import { version } from 'os';
import { ControllerTagsConstant } from 'src/common/constants/controller-tags.constant';
import { ConfigService } from '@nestjs/config';

@ApiTags(SwaggerTags.USERS)
@Controller({
  version: '1',
  path: ControllerTagsConstant.USERS
})
export class UserController {
  private readonly logger = new Logger(UserController.name);;

  constructor(private readonly userService: UserService, private readonly ConfigService: ConfigService) {

  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/')
  findAll() {

    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
