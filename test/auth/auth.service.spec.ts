import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { mockAccessToken } from '../mocks/token.mock';
import { mockRegularUser } from '../mocks/user.mock';

describe('AuthService', () => {
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
					},
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn(),
					},
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		userService = module.get<UserService>(UserService);
		jwtService = module.get<JwtService>(JwtService);
	});

	describe('Validate User', () => {
		it('Should return user data without password when credentials are correct.', async () => {
			userService.findByUsername = jest.fn().mockResolvedValue(mockRegularUser);
			jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

			const result = await authService.validateUser(mockRegularUser.username, 'unhashed password');

			expect(result).toEqual({
				id: mockRegularUser.id,
				username: mockRegularUser.username,
				isAdmin: mockRegularUser.isAdmin,
			});
		});

		it('Should throw Unauthorized Exception when credentials are invalid.', async () => {
			userService.findByUsername = jest.fn().mockResolvedValue(mockRegularUser);
			jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
			await expect(authService.validateUser(mockRegularUser.username, 'wrongpassword')).rejects.toThrow(UnauthorizedException);
		});

		it('Should throw Unauthorized Exception when user is not found.', async () => {
			userService.findByUsername = jest.fn().mockResolvedValue(null);
			await expect(authService.validateUser('unknown username', 'any password')).rejects.toThrow(UnauthorizedException);
		});
	});

	describe('login', () => {
		it('Should return access token', async () => {
			jwtService.sign = jest.fn().mockReturnValue(mockAccessToken);

			const result = await authService.login(mockRegularUser);

			expect(result).toEqual({ access_token: mockAccessToken });
			expect(jwtService.sign).toHaveBeenCalledWith({
				id: mockRegularUser.id,
				username: mockRegularUser.username,
				isAdmin: mockRegularUser.isAdmin,
			});
		});
	});
});
