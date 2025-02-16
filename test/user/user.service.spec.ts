import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { CreateUserRequestDto } from 'src/user/dto/request/create-user.request';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { mockRegularUser } from '../mocks/user.mock';

jest.mock('bcrypt');

describe('UserService', () => {
	let userService: UserService;
	let userRepository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: {
						getOneById: jest.fn(),
						getOneByUsername: jest.fn(),
						createUserInstance: jest.fn(),
						insert: jest.fn(),
					},
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userRepository = module.get<UserRepository>(UserRepository);
	});

	describe('find by id', () => {
		it('should return a user if found', async () => {
			userRepository.getOneById = jest.fn().mockResolvedValue(mockRegularUser);
			const result = await userService.findById(1);
			expect(result).toEqual(mockRegularUser);
			expect(userRepository.getOneById).toHaveBeenCalledWith(1);
		});

		it('should return null if user not found', async () => {
			userRepository.getOneById = jest.fn().mockResolvedValue(null);
			const result = await userService.findById(999);
			expect(result).toBeNull();
		});
	});

	describe('create', () => {
		it('should hash the password and create a user', async () => {
			const dto: CreateUserRequestDto = {
				username: mockRegularUser.username,
				password: mockRegularUser.password,
				isAdmin: false,
			};

			const hashedPassword = 'hashedPassword123';
			(bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>).mockResolvedValue(hashedPassword as never);

			const userToInstance: Partial<User> = {
				username: dto.username,
				password: hashedPassword,
				isAdmin: dto.isAdmin,
				createdFilms: undefined,
				editedFilms: undefined,
			};

			userRepository.createUserInstance = jest.fn().mockResolvedValue(mockRegularUser);
			userRepository.insert = jest.fn().mockResolvedValue(mockRegularUser);

			const result = await userService.create(dto);

			expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
			expect(userRepository.createUserInstance).toHaveBeenCalledWith(userToInstance);
			expect(userRepository.insert).toHaveBeenCalledWith(mockRegularUser);
			expect(result).toEqual(mockRegularUser);
		});
	});

	describe('findByUsername', () => {
		it('should return a user if found by username', async () => {
			userRepository.getOneByUsername = jest.fn().mockResolvedValue(mockRegularUser);
			const result = await userService.findByUsername(mockRegularUser.username);
			expect(result).toEqual(mockRegularUser);
			expect(userRepository.getOneByUsername).toHaveBeenCalledWith(mockRegularUser.username);
		});

		it('should return null if no user is found', async () => {
			userRepository.getOneByUsername = jest.fn().mockResolvedValue(null);
			const result = await userService.findByUsername('unknownUser');
			expect(result).toBeNull();
		});
	});
});
