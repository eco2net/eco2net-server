import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PdfService } from '../pdf/pdf.service';
import { Client } from 'src/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const reader = require('xlsx')
var colors = require('colors/safe');

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService,

        private pdfService: PdfService,

        @InjectRepository(Client)
        private clientRepository: Repository<Client>,) { }

    async sendReportByMail(report) {
        let bufferPdf = await this.pdfService.generatePDF(report);
        console.log(bufferPdf);
        this.mailerService.sendMail({
            to: report.mailInfos.to,
            subject: report.mailInfos.subject,
            template: './sendReport', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
            },
            attachments: [
                {
                    filename: 'Rapoort d\'intervention.pdf',
                    contentType: 'application/pdf',
                    content: bufferPdf
                }
            ]
        });
    }

    async addMailCustumers() {
        const firstSheet = 0;
        let file = reader.readFile("/Users/adamebenadjal/Desktop/clienteco2net.xls");
        let data = [];

        let sheet = file.SheetNames[firstSheet];
        let temp = reader.utils.sheet_to_json(file.Sheets[sheet]);
        let rowsOfExcelWithoutUndefined = temp.filter(row => row.CL_EMAIL !== undefined);

        for (let i = 0; i < rowsOfExcelWithoutUndefined.length; i++) {
            let res = rowsOfExcelWithoutUndefined[i];
            // console.log(res)
            if (!res.CL_EMAIL.includes(" ")) {
                let client = new Client(res.CL_CODE,
                    res.CL_NOM,
                    res.CL_EMAIL)
                    console.log(client);
                    
                let newClient = await this.clientRepository.create(client);
                await this.clientRepository.save(newClient).catch((error) => console.log(error));
            }
        }
        return data
    }
}
