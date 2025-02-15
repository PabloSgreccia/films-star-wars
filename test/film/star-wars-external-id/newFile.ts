import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('StarWarsExternalIdRepository', () => {
	let repository: StarWarsExternalIdRepository;
	let mockRepository: Repository<StarWarsExternalId>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StarWarsExternalIdRepository,
				{
					provide: getRepositoryToken(StarWarsExternalId),
					useValue: {
						findOne: jest.fn(),
					},
				},
			],
		}).compile();

		repository = module.get<StarWarsExternalIdRepository>(StarWarsExternalIdRepository);
		mockRepository = module.get<Repository<StarWarsExternalId>>(getRepositoryToken(StarWarsExternalId));
	});

	it('should be defined', () => {
		expect(repository).toBeDefined();
	});

	it('should return a StarWarsExternalId by externalId', async () => {
		// Arrange: Mock the repository method
		const externalId = 123;
		const mockStarWarsExternalId = {
			external_id: externalId,
			film: { title: 'Star Wars: A New Hope' }, // Mock the related film data
		};
		mockRepository.findOne.mockResolvedValue(mockStarWarsExternalId);

		// Act: Call the method
		const result = await repository.getOneByExternalId(externalId);

		// Assert: Verify the result
		expect(result).toEqual(mockStarWarsExternalId);
		expect(mockRepository.findOne).toHaveBeenCalledWith({
			where: { external_id: externalId },
			relations: { film: true },
		});
	});

	it('should return null if no record is found', async () => {
		// Arrange: Mock the repository method to return null
		const externalId = 123;
		mockRepository.findOne.mockResolvedValue(null);

		// Act: Call the method
		const result = await repository.getOneByExternalId(externalId);

		// Assert: Verify that the result is null
		expect(result).toBeNull();
	});
});
