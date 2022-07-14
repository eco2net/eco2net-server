import { Injectable } from '@nestjs/common';
import { resolve } from 'path/posix';
import * as PDFDocument from 'pdfkit';
const imageToBase64 = require('image-to-base64');
var colors = require('colors/safe');

@Injectable()
export class PdfService {

    constructor() { }


     imageToBase(url: String) {
         return new Promise( resolve => {
            resolve(imageToBase64(url))
        })      
    }

    async generatePDF(report): Promise<Buffer> {
        // console.log(report);
        const attachements = report.attachements.map((element) => element.path);
        console.log(attachements)
        const pdfBuffer: Buffer = await new Promise(async resolve => {
            const doc = new PDFDocument({
                size: 'LETTER',
                bufferPages: true,
            })
            // customize your PDF document
            doc.fontSize(20);
            doc.text("Rapport d'intervention", 200, 50);

            for(let i=0; i< attachements.length; i++) {
                let res = "data:image/png;base64,";
                res += await this.imageToBase(attachements[i]);
                doc.image(res, {width: 250, height : 250});
            }

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
