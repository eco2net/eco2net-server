import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { Attachements } from '../entities/attachement.entity';
import { Etatlieux } from '../entities/etatlieux.entity';
import { Report } from '../entities/report.entity';
import User from 'src/entities/user.entity';
const { forEach } = require('p-iteration');

@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,

        @InjectRepository(Etatlieux)
        private etatLieuxRepository: Repository<Etatlieux>,

        @InjectRepository(Attachements)
        private attachementsEntity: Repository<Attachements>,
    ) { }

    async getAllReports(): Promise<Report[]> {
        let reports = await this.reportRepository.find({ relations: ["listetatLieux", "attachements", "user"] })
        return reports;
    }

    async getReportById(id: number): Promise<Report> {
        let report = await this.reportRepository.findOne(id, { relations: ["listetatLieux", "attachements", "user"] });
        return report
    }

    async getReportsByUser(userId: number): Promise<Report[]> {
        console.log(userId);
        try {
            let reports = await this.reportRepository.find({
                where: {
                    user: userId
                },
                relations: ["listetatLieux", "attachements", "user"]
            })
            return reports;
        } catch (error) {
            console.log(error);
            throw new HttpException('Oups ! Une erreur interne est survenue', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addReport(report: ReportDto, files): Promise<any> {
        let userEntity = new User();
        userEntity.id = report.userId;
        // let userEntity = this.userService.getUserById(report.userId);

        console.log(userEntity.id)
        let reportEnity = new Report(report.switchMembreConseil,
            report.switchCCR,
            report.switchAgentService,
            report.nameSite,
            report.nameGuardian,
        );

        reportEnity.user = userEntity;

        await this.reportRepository.insert(reportEnity).catch((error) => console.log(error));

        forEach(report.listetatLieux, async (etat: Etatlieux) => {
            let etatLieuxEnity = new Etatlieux(etat.etatLieux, etat.etatLieuxDesc);
            etatLieuxEnity.report = reportEnity;
            await this.etatLieuxRepository.insert(etatLieuxEnity).catch((error) => console.log(error));
        })

        forEach(files, async (file: any) => {
            let attachementsEntity = new Attachements(file.originalname, file.location, file.key);
            attachementsEntity.report = reportEnity;
            await this.attachementsEntity.insert(attachementsEntity).catch((error) => console.log(error));
        })
    }
}
