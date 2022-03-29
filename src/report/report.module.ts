import {Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/Report.entity';
import { Attachements } from './entities/Attachement.entity';
import { EtatLieux } from './entities/EtatLieux.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report,Attachements,EtatLieux])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}


