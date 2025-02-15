import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CronController } from 'src/cron/cron.controller';
import { CronService } from 'src/cron/cron.service';
import * as request from 'supertest';

describe('CronController', () => {
	let app: INestApplication;
	let cronService: CronService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CronController],
			providers: [
				{
					provide: CronService,
					useValue: { synchronizeStarWarsFilms: jest.fn().mockResolvedValue('Cron job started') },
				},
			],
		})
			.overrideGuard(JwtAuthGuard)
			.useValue({ canActivate: jest.fn().mockReturnValue(true) })
			.overrideGuard(AdminUserGuard)
			.useValue({ canActivate: jest.fn().mockReturnValue(true) })
			.compile();

		app = module.createNestApplication();
		await app.init();

		cronService = module.get<CronService>(CronService);
	});

	afterEach(async () => {
		await app.close();
	});

	it('should call synchronizeStarWarsFilms and return 200', async () => {
		const response = await request(app.getHttpServer()).post('/cron/star-wars-api');
		expect(response.status).toBe(200);
		expect(cronService.synchronizeStarWarsFilms).toHaveBeenCalled();
	});

	it('should return 403 if user is not an admin', async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CronController],
			providers: [{ provide: CronService, useValue: cronService }],
		})
			.overrideGuard(JwtAuthGuard)
			.useValue({ canActivate: jest.fn().mockReturnValue(true) })
			.overrideGuard(AdminUserGuard)
			.useValue({ canActivate: jest.fn().mockReturnValue(false) })
			.compile();

		const testApp = module.createNestApplication();
		await testApp.init();

		const response = await request(testApp.getHttpServer()).post('/cron/star-wars-api');
		expect(response.status).toBe(403);
	});
});
