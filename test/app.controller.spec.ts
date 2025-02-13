import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';

describe('App Controller', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Server is up!" on GET /health', async () => {
			const result = await appController.obtenerEstado();
			expect(result).toBe('Server is up!');
		});
	});
});
