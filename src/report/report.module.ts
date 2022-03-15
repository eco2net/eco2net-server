import { Catch, Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportScehma } from 'src/schema/report.scehma';

@Module({
  imports: [MongooseModule.forFeature([{name: Report.name, schema : ReportScehma}])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
