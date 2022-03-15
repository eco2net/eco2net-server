import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({
  imports: [ReportModule
    , UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:' + process.env.MONGODB_PASSWORD + '@cluster0.adwic.mongodb.net/' +
      process.env.MONGODB_DB_NAME + '?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
