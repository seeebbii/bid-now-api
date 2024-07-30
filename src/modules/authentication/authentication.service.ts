import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationRepository } from './repository/authentication.repository';
import { Authentication } from './entities/authentication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {

  constructor(
    private authenticationRepository: AuthenticationRepository,
  ) { }

  register(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  login() {
    return 'This action logs in a user';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
