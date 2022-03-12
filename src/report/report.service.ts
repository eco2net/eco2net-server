import { Injectable } from '@nestjs/common';
import { ReportDto } from './dto/report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {

    public reports: ReportDto[] = [];

    getAllService(): ReportDto[] {
        return this.reports;
    }

    addReport(report: ReportDto): ReportDto {
        this.reports.push(report);
        return report;
    }


}
