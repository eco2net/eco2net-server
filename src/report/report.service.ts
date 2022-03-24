import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { Attachements } from './entities/attachement.entity';
import { EtatLieux } from './entities/EtatLieux.entity';
import { Report } from './entities/Report.entity';
const { forEach } = require('p-iteration');

@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,

        @InjectRepository(EtatLieux)
        private etatLieuxRepository: Repository<EtatLieux>,

        @InjectRepository(Attachements)
        private attachementsEntity: Repository<Attachements>
    ) { }
    
    async getAllReports(): Promise<Report[]> {
        let reports = await this.reportRepository.find({ relations: ["listetatLieux", "attachements"] })
        console.log(reports);
        return reports;
    }

    async getReportById(id : number): Promise<Report> {
        let report = await this.reportRepository.findOne(id, { relations: ["listetatLieux", "attachements"] });
        return report
    }

    async addReport(report: ReportDto, files): Promise<any> {
        console.log(files);
        let reportEnity = new Report(report.switchMembreConseil,
            report.switchCCR,
            report.switchAgentService,
            report.nameSite,
            report.nameGuardian
        );
        await this.reportRepository.insert(reportEnity);

        forEach(report.listetatLieux, async (etat: EtatLieux) => {
            let etatLieuxEnity = new EtatLieux(etat.etatLieux, etat.etatLieuxDesc);
            etatLieuxEnity.report = reportEnity;
            await this.etatLieuxRepository.insert(etatLieuxEnity)
        })

        forEach(files, async (file : any) => {
            let attachementsEntity = new Attachements(file.filename, file.originalname, file.path);
            attachementsEntity.report = reportEnity;
            await this.attachementsEntity.insert(attachementsEntity);
        })
    }
}
