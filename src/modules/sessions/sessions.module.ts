import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionRepository } from './repository/session.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, SessionRepository],
  exports: [SessionRepository]
})
export class SessionsModule { }
