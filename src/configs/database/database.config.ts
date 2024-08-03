import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions = (configService: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    migrationsTableName: configService.get('DATABASE_MIGRATIONS_TABLE_NAME'),
    synchronize: true,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../../**/*.migration{.ts,.js}'],
});

const dataSource = (configService: ConfigService): DataSource => new DataSource(dataSourceOptions(configService));