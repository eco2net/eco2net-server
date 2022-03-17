import { Catch, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/Report.entity';
import { EtatLieux } from './entities/EtatLieux.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Report, EtatLieux])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
