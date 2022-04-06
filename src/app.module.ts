import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhotosModule } from './photos/photos.module';

require('dotenv').config();

@Module({
  imports: [ReportModule,
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
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
