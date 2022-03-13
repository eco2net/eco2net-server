import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
// import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Users } from './users/entities/users.entity';
import { Report } from './report/entities/report.entity';

@Module({
  imports: [ReportModule, 
    // UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'user',
      password: 'password123',
      database: 'postgres',
      entities: [Users, Report],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
