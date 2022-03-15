import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from 'src/schema/report.scehma';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
    constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) { }

    async addReport(report: ReportDto): Promise<Report> {
        const createdReport = new this.reportModel(report);
        return createdReport.save();
    }

    async findAllReport() : Promise<Report[]> {
        return this.reportModel.find().exec();
    }


}
