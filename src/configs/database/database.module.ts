import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { dataSourceOptions } from './database.config';


// ! Database configuration module
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => dataSourceOptions(configService),
        }),
    ],
})
export class DatabaseModule { }
