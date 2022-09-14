import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PdfModule } from './pdf/pdf.module';
import { MailModule } from './mail/mail.module';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';
require('dotenv').config();
import LogsMiddleware from "./config/logs/logs.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[databaseConfig],
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_BUCKET_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required()

      })
    }),
    ReportModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSR,
      password: process.env.PGPWD,
      database: process.env.PGDB,
      entities: [
        "dist/entities/**/*.js",
     ],
      synchronize: true,
    }),
    PhotosModule,
    UsersModule,
    AuthModule,
    PdfModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
