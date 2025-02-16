import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { mockRegularUser } from '../mocks/user.mock';
import { Repository } from 'typeorm';

describe('User Repository', () => {
	let userRepository: UserRepository;
	let repositoryMock: Repository<User>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: getRepositoryToken(User),
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOneBy: jest.fn(),
					},
				},
			],
		}).compile();

		userRepository = module.get<UserRepository>(UserRepository);
		repositoryMock = module.get<Repository<User>>(getRepositoryToken(User));
	});

	describe('createUserInstance', () => {
		it('should create a user instance', async () => {
			const userToInstance = { username: mockRegularUser.username, password: mockRegularUser.password, isAdmin: mockRegularUser.isAdmin };
			repositoryMock.create = jest.fn().mockReturnValue(mockRegularUser);

			const result = await userRepository.createUserInstance(userToInstance);

			expect(repositoryMock.create).toHaveBeenCalledWith(userToInstance);
			expect(result).toEqual(mockRegularUser);
		});
	});

	describe('insert', () => {
		it('should insert a new user', async () => {
			repositoryMock.save = jest.fn().mockResolvedValue(mockRegularUser);
			const result = await userRepository.insert(mockRegularUser);

			expect(repositoryMock.save).toHaveBeenCalledWith(mockRegularUser);
			expect(result).toEqual(mockRegularUser);
		});
	});

	describe('get one by username', () => {
		it('should return a user by username', async () => {
			repositoryMock.findOneBy = jest.fn().mockResolvedValue(mockRegularUser);
			const result = await userRepository.getOneByUsername(mockRegularUser.username);
			expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ username: mockRegularUser.username });
			expect(result).toEqual(mockRegularUser);
		});

		it('should return null if user is not found', async () => {
			repositoryMock.findOneBy = jest.fn().mockResolvedValue(null);
			const result = await userRepository.getOneByUsername('unknownUser');
			expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ username: 'unknownUser' });
			expect(result).toBeNull();
		});
	});

	describe('get one by id', () => {
		it('should return a user by id', async () => {
			repositoryMock.findOneBy = jest.fn().mockResolvedValue(mockRegularUser);
			const result = await userRepository.getOneById(1);
			expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: mockRegularUser.id });
			expect(result).toEqual(mockRegularUser);
		});

		it('should return null if user is not found', async () => {
			repositoryMock.findOneBy = jest.fn().mockResolvedValue(null);
			const result = await userRepository.getOneById(999);
			expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: 999 });
			expect(result).toBeNull();
		});
	});
});
