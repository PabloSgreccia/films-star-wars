import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
import { mockRegularUser } from '../mocks/user.mock';

describe('User Repository', () => {
	let userRepository: UserRepository;
	let mockEntityRepository: Partial<Repository<User>>;

	beforeEach(async () => {
		mockEntityRepository = {
			findOneBy: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: getRepositoryToken(User),
					useValue: mockEntityRepository,
				},
			],
		}).compile();

		userRepository = module.get<UserRepository>(UserRepository);
	});

	it('should return a user if found', async () => {
		mockEntityRepository.findOneBy = jest.fn().mockResolvedValue(mockRegularUser);

		const result = await userRepository.getOneByUsername(mockRegularUser.username);

		expect(result).toEqual(mockRegularUser);
		expect(mockEntityRepository.findOneBy).toHaveBeenCalledWith({ username: mockRegularUser.username });
	});

	it('should return null if user is not found', async () => {
		mockEntityRepository.findOneBy = jest.fn().mockResolvedValue(null);

		const result = await userRepository.getOneByUsername('unknown username');

		expect(result).toBeNull();
		expect(mockEntityRepository.findOneBy).toHaveBeenCalledWith({ username: 'unknown username' });
	});
});
