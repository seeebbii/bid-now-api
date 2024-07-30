import { Module } from '@nestjs/common';
import { DatabaseModule } from './configs/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    DatabaseModule,
    AuthenticationModule,
    SessionsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
