import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {

    constructor(
        private pdfService : PdfService
    ) {}

    @Post()
    async getPDF(
        @Res() res,
        @Body() report,
      ): Promise<void> {
      //  console.log(report);
      try {
        var buffer = await this.pdfService.generatePDF(report);
      } catch(error) {
          console.log(error);
      }
        // console.log(buffer);
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=example.pdf',
          'Content-Length': buffer.length,
        })
    
        res.end(buffer)
      }
}
