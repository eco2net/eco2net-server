import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('mail')
export class MailController {

    constructor(
        private mailService: MailService
    ) { }

    @Post()
    async sendReportEmail(@Body() report) {
        return this.mailService.sendReportByMail(report);
    }

    @Get("/emailFromExcel")
    addEmailFromExcel() {
        return this.mailService.addMailCustumers();
    }
}
