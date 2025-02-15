import { Test, TestingModule } from '@nestjs/testing';
import { IExternalStarWarsFilm } from 'src/api-star-wars/api-star-wars.config';
import { ApiStarWarsRepository } from 'src/api-star-wars/api-star-wars.repository';
import { ApiStarWarsService } from 'src/api-star-wars/api-star-wars.service';
import { mockStarWarsApiData } from '../mocks/star-wars-api.mock';

describe('ApiStarWarsService', () => {
	let service: ApiStarWarsService;
	let repository: ApiStarWarsRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ApiStarWarsService,
				{
					provide: ApiStarWarsRepository,
					useValue: {
						getAllFilms: jest.fn().mockResolvedValue(mockStarWarsApiData),
					},
				},
			],
		}).compile();

		service = module.get<ApiStarWarsService>(ApiStarWarsService);
		repository = module.get<ApiStarWarsRepository>(ApiStarWarsRepository);
	});

	describe('get all Star Wars films', () => {
		it('should return a list of Star Wars films', async () => {
			const result: IExternalStarWarsFilm[] = await service.getAllFilms();
			expect(repository.getAllFilms).toHaveBeenCalled();
			expect(result).toEqual(mockStarWarsApiData.results);
		});

		it('should return an empty array if repository call fails', async () => {
			repository.getAllFilms = jest.fn().mockRejectedValue(new Error('API Error'));
			const result: IExternalStarWarsFilm[] = await service.getAllFilms();
			expect(repository.getAllFilms).toHaveBeenCalled();
			expect(result).toEqual([]);
		});
	});
});
