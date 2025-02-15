import { Test, TestingModule } from '@nestjs/testing';
import { ApiStarWarsService } from 'src/api-star-wars/api-star-wars.service';
import { CronService } from 'src/cron/cron.service';
import { FilmService } from 'src/film/film.service';
import { StarWarsExternalIdService } from 'src/film/star-wars-external-id/star-wars-external-id.service';
import { mockStarWarsFilm1, mockStarWarsFilms } from '../mocks/star-wars-api.mock';
import { mockStarWarsExternalId } from '../mocks/star-wars-external-id.mock';

describe('CronService', () => {
	let cronService: CronService;
	let apiStarWarsService: ApiStarWarsService;
	let filmService: FilmService;
	let starWarsExternalIdService: StarWarsExternalIdService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CronService,
				{
					provide: ApiStarWarsService,
					useValue: {
						getAllFilms: jest.fn(),
					},
				},
				{
					provide: FilmService,
					useValue: {
						updateById: jest.fn().mockReturnValue(mockStarWarsFilm1),
						createByStarWarsApi: jest.fn().mockReturnValue(mockStarWarsFilm1),
					},
				},
				{
					provide: StarWarsExternalIdService,
					useValue: {
						findByExternalId: jest.fn(),
					},
				},
			],
		}).compile();

		cronService = module.get<CronService>(CronService);
		apiStarWarsService = module.get<ApiStarWarsService>(ApiStarWarsService);
		filmService = module.get<FilmService>(FilmService);
		starWarsExternalIdService = module.get<StarWarsExternalIdService>(StarWarsExternalIdService);
	});

	describe('Synchronize Star Wars films with external API', () => {
		it('Should synchronize Star Wars films for each film returned by the API', async () => {
			apiStarWarsService.getAllFilms = jest.fn().mockResolvedValue(mockStarWarsFilms);

			await cronService.synchronizeStarWarsFilms();

			expect(apiStarWarsService.getAllFilms).toHaveBeenCalledTimes(1);
			expect(starWarsExternalIdService.findByExternalId).toHaveBeenCalledTimes(mockStarWarsFilms.length);
			mockStarWarsFilms.forEach((film) => {
				expect(starWarsExternalIdService.findByExternalId).toHaveBeenCalledWith(film.episode_id);
			});
		});

		it('Should update the film if already exists in the database', async () => {
			apiStarWarsService.getAllFilms = jest.fn().mockResolvedValue([mockStarWarsFilm1]);
			starWarsExternalIdService.findByExternalId = jest.fn().mockResolvedValue(mockStarWarsExternalId);

			await cronService.synchronizeStarWarsFilms();

			expect(apiStarWarsService.getAllFilms).toHaveBeenCalledTimes(1);
			expect(starWarsExternalIdService.findByExternalId).toHaveBeenCalledWith(mockStarWarsFilm1.episode_id);
			expect(filmService.updateById).toHaveBeenCalledWith(mockStarWarsExternalId.film_id, {
				title: mockStarWarsFilm1.title,
				director: mockStarWarsFilm1.director,
				producer: mockStarWarsFilm1.producer,
				editedBy: null,
				editedAt: null,
				releaseDate: new Date(mockStarWarsFilm1.release_date),
			});
		});

		it('Should save the film if doenst exists in the database', async () => {
			apiStarWarsService.getAllFilms = jest.fn().mockResolvedValue([mockStarWarsFilm1]);
			starWarsExternalIdService.findByExternalId = jest.fn().mockResolvedValue(null);

			await cronService.synchronizeStarWarsFilms();

			expect(apiStarWarsService.getAllFilms).toHaveBeenCalledTimes(1);
			expect(starWarsExternalIdService.findByExternalId).toHaveBeenCalledWith(mockStarWarsFilm1.episode_id);
			expect(filmService.createByStarWarsApi).toHaveBeenCalledWith(
				{
					title: mockStarWarsFilm1.title,
					director: mockStarWarsFilm1.director,
					producer: mockStarWarsFilm1.producer,
					releaseDate: new Date(mockStarWarsFilm1.release_date),
				},
				mockStarWarsFilm1.episode_id,
			);
		});
	});
});
