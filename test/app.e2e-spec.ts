import { Test, TestingModule } from '@nestjs/testing';
import { AllowedMethodsMiddleware } from '../src/allowed-methods.middleware';
import { Validator } from '../src/validator';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(AllowedMethodsMiddleware);
    app.useGlobalPipes(Validator);
    await app.init();
  });

  it('/fizzbuzz (POST) count: 3', () => {
    return request(app.getHttpServer())
      .post('/fizzbuzz')
      .send({ count: 3 })
      .expect(201)
      .expect({ error: null, response: '1 2 Fizz' });
  });

  it('/fizzbuzz (POST) count: "a"', () => {
    return request(app.getHttpServer())
      .post('/fizzbuzz')
      .send({ count: 'a' })
      .expect(400)
      .expect({
        response: '',
        error:
          'Invalid input. An instance of GetFizzBuzzDto has failed the validation:\n' +
          ' - property count has failed the following constraints: isInt, min, isNumber \n',
      });
  });

  it('/fizzbuzz (POST) count: -1', () => {
    return request(app.getHttpServer())
      .post('/fizzbuzz')
      .send({ count: -1 })
      .expect(400)
      .expect({
        response: '',
        error:
          'Invalid input. An instance of GetFizzBuzzDto has failed the validation:\n' +
          ' - property count has failed the following constraints: min \n',
      });
  });

  it('/fizzbuzz (POST) count:2.1', () => {
    return request(app.getHttpServer())
      .post('/fizzbuzz')
      .send({ count: 2.1 })
      .expect(400)
      .expect({
        response: '',
        error:
          'Invalid input. An instance of GetFizzBuzzDto has failed the validation:\n' +
          ' - property count has failed the following constraints: isInt \n',
      });
  });

  it('/fizzbuzzer (POST)', () => {
    return request(app.getHttpServer())
      .post('/fizzbuzzer')
      .expect(404);
  });

  it('/fizzbuzz (GET)', () => {
    return request(app.getHttpServer())
      .get('/fizzbuzz')
      .expect(405);
  });

  it('/fizzbuzz (PUT)', () => {
    return request(app.getHttpServer())
      .put('/fizzbuzz')
      .expect(405);
  });

  it('/fizzbuzz (DELETE)', () => {
    return request(app.getHttpServer())
      .del('/fizzbuzz')
      .expect(405);
  });

  it('/fizzbuzz (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/fizzbuzz')
      .expect(405);
  });
});
