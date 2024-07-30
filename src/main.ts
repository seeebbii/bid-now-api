import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTags } from './common/constants/swagger-tags.constant';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';


async function bootstrap() {

  const app = await NestFactory.create(AppModule,);
  app.setGlobalPrefix('api');

  // ! Versioning
  app.enableVersioning({
    defaultVersion: ['1', '2',],
    type: VersioningType.URI
  });

  const logger = new Logger();

  // ! Config Service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('HTTP_PORT');
  const databaseHost = configService.get<string>('DATABASE_HOST');
  const databaseType = configService.get<string>('DATABASE_TYPE');

  // ! Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Typeorm API')
    .setDescription('')
    .setVersion('1.0')
    .addTag(SwaggerTags.AUTH)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // ! Whitelisting domains for CORS
  const whitelist = [
    'http://localhost:3000',
    // 'http://13.200.199.23',
    'http://localhost:8000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
  ];

  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: (origin, callback) => {
  //     logger.debug('🚀 ~ bootstrap ~ origin:', origin);
  //     if (!origin) {
  //       callback(null, true);
  //       return;
  //     }
  //     if (whitelist.includes(origin)) {
  //       logger.debug('Allowed CORS for:', origin);
  //       callback(null, true);
  //     } else {
  //       logger.debug('Blocked CORS for:', origin);
  //       const error = new Error('Not allowed by CORS');
  //       callback(error, false);
  //     }
  //   },
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  // });

  await app.listen(port);

  logger.log(`==========================================================`);

  logger.log(`Environment Variable`, 'NestApplication');
  logger.log(`Port is ${port}`, 'NestApplication');

  logger.log(`==========================================================`);

  logger.log(
    `Http Server running on ${await app.getUrl()}`,
    'NestApplication'
  );
  logger.log(`Database Host ${databaseHost}`, 'NestApplication');
  logger.log(`Database Type ${databaseType}`, 'NestApplication');

  logger.log(`==========================================================`);
}

bootstrap();
