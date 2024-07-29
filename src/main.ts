import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTags } from './common/constants/swagger-tags.constant';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';


async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const logger = new Logger();

  // ! Config Service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('HTTP_PORT');
  logger.log(`Port is ${port}`, 'NestApplication');

  // ! Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Typeorm API')
    .setDescription('')
    .setVersion('1.0')
    .addTag(SwaggerTags.AUTH)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);



  // logger.log(`==========================================================`);

  // logger.log(`Environment Variable`, 'NestApplication');
  // logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');

  // logger.log(`==========================================================`);

  // logger.log(`Job is ${jobEnable}`, 'NestApplication');
  // logger.log(
  //   `Http is ${httpEnable}, ${httpEnable ? 'routes registered' : 'no routes registered'
  //   }`,
  //   'NestApplication'
  // );
  // logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');

  // logger.log(
  //   `Http Server running on ${await app.getUrl()}`,
  //   'NestApplication'
  // );
  // logger.log(`Database uri ${databaseUri}`, 'NestApplication');

  // logger.log(`==========================================================`);
}
bootstrap();
