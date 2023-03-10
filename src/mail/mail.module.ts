import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailController } from './mail.controller';
import { PdfModule } from '../pdf/pdf.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';

@Module({
  providers: [MailService],
  // imports: [TypeOrmModule.forFeature([Report,Attachements,Etatlieux, User])],

  imports: [
    TypeOrmModule.forFeature([Client]),
    PdfModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'eco2net.app@gmail.com',
          pass: 'zqhuchskdcojooan',
        },
      },
      defaults: {
        from: 'eco2net.app@gmail.com',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
