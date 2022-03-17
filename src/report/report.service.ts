import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { Report } from './entities/Report.entity';

@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Report)
        private reportRepository : Repository<Report>
    ) {

    }

    public reports: ReportDto[] = [];

    getAllReports(): Promise<Report[]> {
        return this.reportRepository.find();
    }

    addReport(report): Promise<InsertResult> {
        return this.reportRepository.insert(report);
    }


}
