import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentication } from './entities/authentication.entity';
import { AuthenticationRepository } from './repository/authentication.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationRepository],
})
export class AuthenticationModule { }
