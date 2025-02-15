import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserRequestDto } from 'src/auth/dto/request/register.request.dto';
import { LoginResponseDto } from 'src/auth/dto/response/login.response.dto';
import { RequestWithUserPayload } from 'src/auth/dto/token-payload';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { mockAccessToken } from '../mocks/token.mock';
import { mockAdminUser, mockRegularUser } from '../mocks/user.mock';

describe('AuthController', () => {
	let authController: AuthController;
	let authService: AuthService;

	const mockAuthService = {
		registerAdmin: jest.fn().mockResolvedValue({ message: `Admin user created: ${mockAdminUser.username}` }),
		register: jest.fn().mockResolvedValue({ access_token: mockAccessToken }),
		login: jest.fn().mockResolvedValue({ access_token: mockAccessToken }),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: mockAuthService }],
		})
			.overrideGuard(JwtAuthGuard)
			.useValue({ canActivate: jest.fn(() => true) })
			.overrideGuard(AdminUserGuard)
			.useValue({ canActivate: jest.fn(() => true) })
			.overrideGuard(LocalAuthGuard)
			.useValue({ canActivate: jest.fn(() => true) })
			.compile();

		authController = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	describe('register admin user', () => {
		it('should register an admin user', async () => {
			const userDto: RegisterUserRequestDto = { username: mockAdminUser.username, password: mockAdminUser.password };
			const result = await authController.registerAdminUser(userDto);
			expect(authService.registerAdmin).toHaveBeenCalledWith(userDto);
			expect(result).toEqual({ message: `Admin user created: ${mockAdminUser.username}` });
		});
	});

	describe('register regular user', () => {
		it('should register a regular user and return a JWT token', async () => {
			const userDto: RegisterUserRequestDto = { username: mockRegularUser.username, password: mockRegularUser.password };
			const result: LoginResponseDto = await authController.registerRegularUser(userDto);
			expect(authService.register).toHaveBeenCalledWith(userDto);
			expect(result).toEqual({ access_token: mockAccessToken });
		});
	});

	describe('login', () => {
		it('should log in a user and return a JWT token', async () => {
			const mockRequest = { user: { id: mockRegularUser.id, username: mockRegularUser.username, isAdmin: mockRegularUser.isAdmin } } as RequestWithUserPayload;
			const result: LoginResponseDto = await authController.login(mockRequest);
			expect(authService.login).toHaveBeenCalledWith(mockRequest.user);
			expect(result).toEqual({ access_token: mockAccessToken });
		});
	});
});
