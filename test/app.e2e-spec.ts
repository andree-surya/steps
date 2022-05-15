import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';

describe('StepsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('PUT /steps/:id', () => {
    it('should return HTTP 200 on valid input', () =>
      request(app.getHttpServer())
        .put(`/steps/${randomUUID()}`)
        .send({
          count: 120,
          timestamp: '2022-04-05T13:00:00.000+07:00',
        })
        .expect(200));

    it('should return HTTP 400 on invalid input', () =>
      request(app.getHttpServer())
        .put(`/steps/${randomUUID()}`)
        .send({
          count: -1,
          timestamp: 'not a date string',
        })
        .expect(400));
  });

  describe('GET /steps', () => {
    it('should return HTTP 200 on valid input', () =>
      request(app.getHttpServer())
        .get('/steps')
        .query({ from: '2022-02-03', to: '2022-02-08' })
        .expect(200));

    it('should return HTTP 400 on invalid input', () =>
      request(app.getHttpServer())
        .get('/steps')
        .query({ from: '2022-02-03' })
        .expect(400));
  });
});
