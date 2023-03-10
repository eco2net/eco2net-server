import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { InsertResult } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { Report } from '../entities/report.entity';
import { ReportService } from './report.service';
import JwtAuthenticationGuard from 'src/auth/guards/jwtAuthentification.guard';
import { LocalAuthenticationGuard } from 'src/auth/guards/localAuthentication.guard';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  // @UseGuards(LocalAuthenticationGuard)
  @Get()
  getAllReports(): Promise<Report[]> {
    return this.reportService.getAllReports();
  }

  @Get(":id")
  getOneReport(@Param() param) : Promise<Report> {
    return this.reportService.getReportById(param.id);
  }

  @Get('/user/:id')
  getReportByUserId(@Param() param) : Promise<Report[]> {
    return this.reportService.getReportsByUser(param.id);
  }


  @Post()
  @UseInterceptors(FilesInterceptor('files[]',100, multerOptions))
  addReport(@UploadedFiles() files: Array<Express.Multer.File>, @Body() report): any {

    let reportDto = JSON.parse(report.form);
    console.log(report);
    return this.reportService.addReport(reportDto, files);
  }
}
