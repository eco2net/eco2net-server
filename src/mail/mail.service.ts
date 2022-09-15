import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PdfService } from '../pdf/pdf.service';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,
        private pdfService : PdfService) { }

    async sendReportByMail(report) {
        console.log(report);
        let bufferPdf = await this.pdfService.generatePDF(report);
        console.log(bufferPdf);
        this.mailerService.sendMail({
            to: report.mailInfos.to,
            subject: report.mailInfos.subject,
            template: './sendReport', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
            },
            attachments : [
                {
                    filename: 'Rapoort d\'intervention.pdf',
                    contentType: 'application/pdf',
                    content : bufferPdf
                }
            ]
        });
    }
}
