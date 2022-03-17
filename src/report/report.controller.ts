import { Body, Controller, Get, Post } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { Report } from './entities/Report.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get()
  getAllReports(): Promise<Report[]> {
    return this.reportService.getAllReports();
  }

  @Post()
  addReport(@Body() reportDto : ReportDto): Promise<InsertResult> {
    return this.reportService.addReport(reportDto)
  }
}
