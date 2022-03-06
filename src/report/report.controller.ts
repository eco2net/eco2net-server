import { Controller, Get } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(): Report[] {
    return this.reportService.getAllService();
  }
}
