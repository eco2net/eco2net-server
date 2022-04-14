import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[databaseConfig],
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_BUCKET_NAME: Joi.string().required(),
      })
    }),
    ReportModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.PGHOSTLOCAL,
      port: parseInt(process.env.PGPORTLOCAL),
      username: process.env.PGUSRLOCAL,
      password: process.env.PGPWDLOCAL,
      database: process.env.PGDBLOCAL,
      entities: [
        "dist/entities/**/*.js",
     ],
      synchronize: true,
    }),
    PhotosModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
