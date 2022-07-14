import {Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../entities/report.entity';
import { Attachements } from '../entities/attachement.entity';
import { Etatlieux } from '../entities/etatlieux.entity';
import User from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report,Attachements,Etatlieux, User])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}


