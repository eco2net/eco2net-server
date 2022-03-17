import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { EtatLieux } from './entities/EtatLieux.entity';
import { Report } from './entities/Report.entity';
const { forEach } = require('p-iteration');

@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
        
        @InjectRepository(EtatLieux)
        private etatLieuxRepository: Repository<EtatLieux>
    ) { }


    async getAllReports(): Promise<Report[]> {
        let reports = await this.reportRepository.find({relations:["listetatLieux"]})
        console.log(reports);
        return reports;
    }

    async addReport(report: ReportDto): Promise<any> {
        let reportEnity = new Report(report.switchMembreConseil,
            report.switchCCR,
            report.switchAgentService,
            report.nameSite,
            report.nameGuardian
        );
        console.log(reportEnity);
        const addReport = await this.reportRepository.insert(reportEnity);

        forEach(report.listetatLieux, async (etat: EtatLieux) => {
            let etatLieuxEnity = new EtatLieux(etat.etatLieux, etat.etatLieuxDesc);
            etatLieuxEnity.report = reportEnity;
            console.log(etatLieuxEnity);
            const addEtatReport = await this.etatLieuxRepository.insert(etatLieuxEnity)
        })

    }


}
