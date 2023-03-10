import { Injectable } from '@nestjs/common';
import { resolve } from 'path/posix';
import * as PDFDocument from 'pdfkit';
const imageToBase64 = require('image-to-base64');
var colors = require('colors/safe');

@Injectable()
export class PdfService {

    constructor() { }

    generateHeaderPDF(doc, report) {
        doc.image('src/assets/image003.png', 230, 0, { fit: [140, 140], align: 'center', valign: 'center' });
    }

    getLineTest(doc, debut, fin) {
        doc
            .strokeColor("red")
            .lineWidth(2)
            .moveTo(50, debut)
            .lineTo(50, fin)
            .stroke();
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

    }

    generateTableRow(doc, y, item, description, fontSize) {
        doc
            .fillColor('black')
            .fontSize(fontSize)
            .text(item, 55, y)
            .font("Helvetica")
            .text(description, 150, y)
    }

    generateRemarksPDF(doc, report) {
        const reportRemarksTop = 275;
        const listetatLieux = report.listetatLieux;

        doc.fontSize(12)
            .font("Helvetica-Bold")
            .text("Etat des lieux du nettoyage du bâtiment", 50, reportRemarksTop + 15);

        this.generateHr(doc, reportRemarksTop + 30);

        this.generateTableRow(doc, reportRemarksTop + 55, "Lieu", "Description", 12);

        const marginBtwRemark = 30;
        let position = 350;
        for (let i = 0; i < listetatLieux.length; i++) {
            let remark = listetatLieux[i];

            if (i !== 0) position = doc.y + marginBtwRemark;

            console.log(colors.red.underline("i = " + i + " - " + remark.etatLieux + " - position " + position));
            this.generateTableRow(
                doc,
                position,
                remark.etatLieux,
                remark.etatLieuxDesc,
                10
            );
        }
    }

    imageToBase(url: String) {
        return new Promise(async resolve => {
            let res = await imageToBase64(url)
            resolve("data:image/png;base64,"+ res);
        })
    }

    getAllImgToBase64(attachements) {
        let promises = [];
        for (let i = 0; i < attachements.length; i++) {
            promises.push(this.imageToBase(attachements[i]))
        }
        return Promise.all(promises);
    }
    
    async generatePDF(report): Promise<Buffer> {
        let cpt = 0;
        let positionY = 50;

        const attachements = report.attachements.map((element) => element.path);
        const pdfBuffer: Buffer = await new Promise(async resolve => {
            const doc = new PDFDocument({
                size: 'A4',
                bufferPages: false
            })

            this.generateHeaderPDF(doc, report);
            this.generateDetailsPDF(doc, report);
            this.generateRemarksPDF(doc, report);

            doc.addPage();
            doc.fontSize(12)
                .font("Helvetica-Bold")
                .text("Pièces jointes", 50, 25);

            this.generateHr(doc, 40);

            doc.moveDown(5);

            //Get all img base64 in array
            let arrayOfBase64 = await this.getAllImgToBase64(attachements);

            for (let i = 0; i < arrayOfBase64.length; i++) {
                //One picture at 30px and the second on the same line at 330px
                let x = (i%2)*300 + 30;

                //Max 4 pictures per page
                if (cpt%4 === 0 && cpt != 0) {
                    doc.addPage();
                    cpt = 0
                }

                //Two first picture at y = 50px and the two others at y=400
                if(cpt === 0 || cpt === 1) positionY = 50
                else positionY = 400;

                doc.image(arrayOfBase64[i],x,positionY, { fit: [250, 250], align: 'center', valign: 'center', link: attachements[i] })
                cpt++
            }

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
