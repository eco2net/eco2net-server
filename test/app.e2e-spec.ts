import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getReportByIdOneResult }  from './Constants/ExpectedResponseTest'

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Reports CR', () => {
    it('Should return a report with id = 1', () => {
      return request(app.getHttpServer())
        .get('/report/1').then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual(getReportByIdOneResult)
        })
    });

    it('Should return a 400 for a bad id (id = "badId" not a number)', () => {
      return request(app.getHttpServer())
        .get('/report/badId').then(response => {
          expect(response.statusCode).toBe(400);
        })
    });
  }) 

});
