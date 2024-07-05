import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { AuthService } from '../auth.service';
import { SignInDTO } from '../dto/signin.dto';

const TIMEOUT = 6000;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue({ signIn: jest.fn().mockResolvedValue(true) })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true })
    );
    await app.init();
  });

  describe('/auth/login (POST)', () => {
    it(
      'should get validation errors',
      async () => {
        const expectedResponse = {
          message: [
            'email must be an email',
            'password must be a string',
            'password should not be empty',
          ],
          error: 'Bad Request',
          statusCode: 400,
        };

        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expectedResponse);
      },
      TIMEOUT
    );

    it(
      'should successfully login',
      async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: 'john@doe.com', password: 'password' } as SignInDTO);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
      },
      TIMEOUT
    );
  });
});
