import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PhotosModule } from './photos/photos.module';
import { Report } from './report/entities/Report.entity';
import { Attachements } from './report/entities/Attachement.entity';
import { EtatLieux } from './report/entities/EtatLieux.entity';

@Module({
  imports: [ReportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'user',
      password: 'password123',
      database: 'postgres',
      entities: [Report,Attachements,EtatLieux],
      synchronize: true,
    }),
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
