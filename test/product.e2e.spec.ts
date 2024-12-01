import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AdminGuard } from 'src/common/guards/admin.guard';

describe('ProductController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AdminGuard)
            .useValue({ canActivate: jest.fn(() => true) })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/product (GET)', () => {
        return request(app.getHttpServer())
            .get('/product?productCode=1000&location=West Malaysia')
            .expect(200)
            .expect([]);
    });

    it('/product (POST)', () => {
        return request(app.getHttpServer())
            .post('/product')
            .send({ productCode: '1000', location: 'West Malaysia', price: 300 })
            .expect(201);
    });
});
