import { Injectable } from '@nestjs/common';
import { resolve } from 'path/posix';
import * as PDFDocument from 'pdfkit';
const imageToBase64 = require('image-to-base64');
var colors = require('colors/safe');

@Injectable()
export class PdfService {

    constructor() { }

    imageToBase(url: String) {
        return new Promise(resolve => {
            resolve(imageToBase64(url))
        })
    }

    generateHeaderPDF(doc, report) {
        doc.image('src/assets/image003.png', 230, 0, { fit: [140, 140], align: 'center', valign: 'center' });
    }

    generateHr(doc, y) {
        doc
            .strokeColor("#292828")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }

    generateDetailsPDF(doc, report) {
        doc.fontSize(12)
            .font("Helvetica-Bold")
            .text("Détails rapport d'intervention", 50, 130)
        this.generateHr(doc, 145);

        let switchAgentService = report.switchAgentService ? "Oui" : "Non";
        let switchCCR = report.switchCCR ? "Oui" : "Non";
        let switchMembreConseil = report.switchMembreConseil ? "Oui" : "Non"

        const reportDetailsTop = 160;

        //Immeuble Date & Réalisé par
        doc.fontSize(10)
            .font("Helvetica")
            .text("Immeuble :", 50, reportDetailsTop)
            .font("Helvetica-Bold")
            .text(report.nameSite, 150, reportDetailsTop)
            .font("Helvetica")
            .text("Date :", 50, reportDetailsTop + 15)
            .font("Helvetica-Bold")
            .text(report.createdAt, 150, reportDetailsTop + 15)
            .font("Helvetica")
            .text("Réalisé par :", 50, reportDetailsTop + 30)
            .font("Helvetica-Bold")
            .text(report.nameGuardian, 150, reportDetailsTop + 30)

        //En presence de
        doc.fontSize(12)
            .font("Helvetica-Bold")
            .text("En présence de :", 250, reportDetailsTop + 50);

        doc.fontSize(10)
            .font("Helvetica")
            .text("L'agent de service :", 50, reportDetailsTop + 65)
            .font("Helvetica-Bold")
            .text(switchAgentService, 200, reportDetailsTop + 65)


        doc.fontSize(10)
            .font("Helvetica")
            .text("Membre du conseil syndicale :", 50, reportDetailsTop + 80)
            .font("Helvetica-Bold")
            .text(switchMembreConseil, 200, reportDetailsTop + 80)


        doc.fontSize(10)
            .font("Helvetica")
            .text("Le representant de la CCR :", 50, reportDetailsTop + 95)
            .font("Helvetica-Bold")
            .text(switchCCR, 200, reportDetailsTop + 95);

        // this.generateHr(doc, reportDetailsTop + 120);
    }

    generateTableRow(doc, y, item, description, fontSize) {
        doc
            .fontSize(fontSize)
            .text(item, 55, y, { width: 65 })
            .text(description, 150, y)
    }

    getNbLinesDescription(description: String) {
        return description.split('').filter((element => element === '\n')).length + 1;
    }

    generateRemarksPDF(doc, report) {
        const reportRemarksTop = 275;
        const listetatLieux = report.listetatLieux;

        doc.fontSize(12)
            .font("Helvetica-Bold")
            .text("Etat des lieux du nettoyage du bâtiment", 50, reportRemarksTop + 15);

        this.generateHr(doc, reportRemarksTop + 30);

        this.generateTableRow(doc, reportRemarksTop + 55, "Lieu", "Description", 12);

        let position = 345;
        for (let i = 0; i < listetatLieux.length; i++) {
            let remark = listetatLieux[i];
            let nbLinesDescirption = this.getNbLinesDescription(remark.etatLieuxDesc);
            console.log(i)
            if (i === 0) {
                position = 345;
            }
            else {
                position = position + nbLinesDescirption * 25;
                //If poisition is bigger than page size
                if (position > 650) {
                    doc.addPage({ format: "LETTER" });
                    position = 50;
                }
            }
            
            this.generateTableRow(
                doc,
                position,
                remark.etatLieux,
                remark.etatLieuxDesc,
                10
            );

            // Add space between each remark
            position += 50;
        }
    }

    async generatePDF(report): Promise<Buffer> {
        console.log(report);
        const attachements = report.attachements.map((element) => element.path);
        const pdfBuffer: Buffer = await new Promise(async resolve => {
            const doc = new PDFDocument({
                size: 'LETTER'
            })

            this.generateHeaderPDF(doc, report);
            this.generateDetailsPDF(doc, report);
            this.generateRemarksPDF(doc, report);

            // for (let i = 0; i < attachements.length; i++) {
            //     if (i % 2 === 0) doc.addPage();
            //     let res = "data:image/png;base64,";
            //     res += await this.imageToBase(attachements[i]);
            //     doc.image(res, 181, 136 * i % 2 + 136, { fit: [300, 300], align: 'center', valign: 'center', link: attachements[i] });
            // }

            // this.generateFooter(doc);

            // data:image/png;base64,
            // console.log(colors.red.underline(res));
            doc.end();

            const buffer = []
            doc.on('data', buffer.push.bind(buffer))
            doc.on('end', () => {
                const data = Buffer.concat(buffer)
                resolve(data)
            })
        })
        return pdfBuffer
    }
}
