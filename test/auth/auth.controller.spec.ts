import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { mockAccessToken } from '../mocks/token.mock';

describe('Auth Controller', () => {
	let authController: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: { login: jest.fn().mockResolvedValue({ access_token: mockAccessToken }) },
				},
			],
		})
			.overrideGuard(LocalAuthGuard)
			.useValue({ canActivate: jest.fn().mockReturnValue(true) })
			.compile();

		authController = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	it('Should call AuthService login and return a token.', async () => {
		const mockRequest = { user: { username: 'any username', password: 'unhashed password' } };
		const result = await authController.login(mockRequest);
		expect(authService.login).toHaveBeenCalledWith(mockRequest.user);
		expect(result).toEqual({ access_token: mockAccessToken });
	});

	it('Should call req.logout().', async () => {
		const mockRequest = { logout: jest.fn() };

		await authController.logout(mockRequest);

		expect(mockRequest.logout).toHaveBeenCalled();
	});
});
