import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { StarWarsExternalIdRepository } from 'src/film/star-wars-external-id/star-wars-external-id.repository';
import { mockStarWarsExternalId } from '../../mocks/star-wars-external-id.mock';

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

	it('should return a StarWarsExternalId by a given external id', async () => {
		mockRepository.findOne = jest.fn().mockResolvedValue(mockStarWarsExternalId);
		const result = await repository.getOneByExternalId(mockStarWarsExternalId.external_id);
		expect(result).toEqual(mockStarWarsExternalId);
		expect(mockRepository.findOne).toHaveBeenCalledWith({
			where: { external_id: mockStarWarsExternalId.external_id },
			relations: { film: true },
		});
	});

	it('should return null if no record is found', async () => {
		mockRepository.findOne = jest.fn().mockResolvedValue(null);
		const result = await repository.getOneByExternalId(123);
		expect(result).toBeNull();
	});
});
