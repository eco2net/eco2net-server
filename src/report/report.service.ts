import { Injectable } from '@nestjs/common';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
    getAllService(): Report[] {
        let reports: Report[] = [];
        let report: Report = {
            switchAgentService: true,
            switchCCR: true,
            switchMembreConseil: false,
            nameSite: 'Test',
            nameGuardian: 'Test',
            listetatLieux: []
        };
        reports.push(report);
        return reports;
    }
}
