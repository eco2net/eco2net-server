import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ReportModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
