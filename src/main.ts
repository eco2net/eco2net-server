import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
