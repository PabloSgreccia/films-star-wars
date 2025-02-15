import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserRequestDto } from 'src/auth/dto/request/register.request.dto';
import { LoginResponseDto } from 'src/auth/dto/response/login.response.dto';
import { TokenPayload } from 'src/auth/dto/token-payload';
import { UserService } from 'src/user/user.service';
import { mockAdminUser, mockRegularUser } from '../mocks/user.mock';
import { mockAccessToken } from '../mocks/token.mock';

jest.mock('bcrypt');

describe('Auth Service', () => {
	let authService: AuthService;
	let userService: UserService;
	let jwtService: JwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: {
						findByUsername: jest.fn(),
						create: jest.fn(),
					},
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn().mockReturnValue(mockAccessToken),
					},
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);
		jwtService = module.get<JwtService>(JwtService);
	});

	describe('validate user', () => {
		it('should return user without password when credentials are valid', async () => {
			userService.findByUsername = jest.fn().mockResolvedValue(mockRegularUser);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);

			const result = await authService.validateUser(mockRegularUser.username, mockRegularUser.password);
			expect(result).toEqual({ id: mockRegularUser.id, username: mockRegularUser.username, isAdmin: mockRegularUser.isAdmin });
		});

		it('should throw UnauthorizedException for invalid credentials', async () => {
			userService.findByUsername = jest.fn().mockResolvedValue(null);
			await expect(authService.validateUser(mockRegularUser.username, 'wrongpassword')).rejects.toThrow(UnauthorizedException);
		});
	});

	describe('login', () => {
		it('should sign and return JWT token', async () => {
			const userPayload: TokenPayload = { id: mockRegularUser.id, username: mockRegularUser.username, isAdmin: mockRegularUser.isAdmin };
			const result: LoginResponseDto = await authService.login(userPayload);

			expect(jwtService.sign).toHaveBeenCalledWith(userPayload);
			expect(result).toEqual({ access_token: mockAccessToken });
		});
	});

	describe('register regular user', () => {
		it('should register a regular user and return JWT token', async () => {
			const userDto: RegisterUserRequestDto = { username: mockRegularUser.username, password: mockRegularUser.password };

			userService.findByUsername = jest.fn().mockResolvedValue(null);
			userService.create = jest.fn().mockResolvedValue(mockRegularUser);
			const result = await authService.register(userDto);

			expect(userService.create).toHaveBeenCalledWith({ username: mockRegularUser.username, password: mockRegularUser.password, isAdmin: false });
			expect(jwtService.sign).toHaveBeenCalledWith({ id: mockRegularUser.id, username: mockRegularUser.username, isAdmin: false });
			expect(result).toEqual({ access_token: mockAccessToken });
		});

		it('should throw BadRequestException if username already exists', async () => {
			const userDto: RegisterUserRequestDto = { username: 'existinguser', password: 'Valid123' };
			userService.findByUsername = jest.fn().mockResolvedValue(mockRegularUser);
			await expect(authService.register(userDto)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if username is invalid', async () => {
			const userDto: RegisterUserRequestDto = { username: 'invalid user', password: 'Valid123' };
			await expect(authService.register(userDto)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if password is invalid', async () => {
			const userDto: RegisterUserRequestDto = { username: 'existinguser', password: 'invalidpass' };
			await expect(authService.register(userDto)).rejects.toThrow(BadRequestException);
		});
	});

	describe('register admin user', () => {
		it('should register an admin user', async () => {
			const userDto: RegisterUserRequestDto = { username: mockAdminUser.username, password: mockAdminUser.password };

			userService.findByUsername = jest.fn().mockResolvedValue(null);
			userService.create = jest.fn().mockResolvedValue(mockAdminUser);
			const result = await authService.registerAdmin(userDto);

			expect(userService.create).toHaveBeenCalledWith({ username: mockAdminUser.username, password: mockAdminUser.password, isAdmin: true });
			expect(result).toEqual({ message: `Admin user created: ${mockAdminUser.username}` });
		});

		it('should throw BadRequestException if username already exists', async () => {
			const userDto: RegisterUserRequestDto = { username: 'existinguser', password: 'Valid123' };
			userService.findByUsername = jest.fn().mockResolvedValue(mockRegularUser);
			await expect(authService.registerAdmin(userDto)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if username is invalid', async () => {
			const userDto: RegisterUserRequestDto = { username: 'invalid user', password: 'Valid123' };
			await expect(authService.registerAdmin(userDto)).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException if password is invalid', async () => {
			const userDto: RegisterUserRequestDto = { username: 'existinguser', password: 'invalidpass' };
			await expect(authService.registerAdmin(userDto)).rejects.toThrow(BadRequestException);
		});
	});
});
