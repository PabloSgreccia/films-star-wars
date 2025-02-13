import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { mockRegularUser } from '../mocks/user.mock';

describe('User Service', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: {
						getOneByUsername: jest.fn(),
					},
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userRepository = module.get<UserRepository>(UserRepository);
	});

	it('should be defined', () => {
		expect(userService).toBeDefined();
	});

	describe('Find user by username', () => {
		it('Should return a user.', async () => {
			userRepository.getOneByUsername = jest.fn().mockResolvedValue(mockRegularUser);

			const result = await userService.findByUsername(mockRegularUser.username);

			expect(userRepository.getOneByUsername).toHaveBeenCalledWith(mockRegularUser.username);
			expect(result).toEqual(mockRegularUser);
		});

		it('Should throw not found exception if user is not found.', async () => {
			userRepository.getOneByUsername = jest.fn().mockResolvedValue(null);

			// let error;
			// try {
			// 	await userService.findByUsername(mockRegularUser.username);
			// } catch (e) {
			// 	error = e;
			// }

			// expect(error).toBeInstanceOf(NotFoundException);

			await expect(userService.findByUsername('Unknown username')).rejects.toThrow(NotFoundException);
		});
	});
});
