import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/Multer.config';
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

  @Get(":id")
  getOneReport(@Param() param) : Promise<Report> {
    return this.reportService.getReportById(param.id);
  }


  @Post()
  @UseInterceptors(FilesInterceptor('files[]',100, multerOptions))
  addReport(@UploadedFiles() files: Array<Express.Multer.File>, @Body() report): any {
    console.log(files);
    console.log(JSON.parse(report.form))
    let reportDto = JSON.parse(report.form);
    return this.reportService.addReport(reportDto, files);
  }
}
