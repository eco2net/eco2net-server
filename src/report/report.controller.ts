import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(): Report[] {
    return this.reportService.getAllService();
  }

  @Post()
  addReport(@Body() reportDto : ReportDto): ReportDto {
    return this.reportService.addReport(reportDto);
  }
}
