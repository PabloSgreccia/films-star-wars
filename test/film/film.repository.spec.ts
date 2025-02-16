import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { FilmRepository } from 'src/film/film.repository';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { mockFilm1, mockFilm2, mockUpdateFilmDto } from '../mocks/film.mock';
import { mockAdminUser } from '../mocks/user.mock';

describe('FilmRepository', () => {
	let mockRepository: Repository<Film>;
	let filmRepository: FilmRepository;

	let dataSourceMock: jest.Mocked<DataSource>;
	let queryRunnerMock: jest.Mocked<QueryRunner>;

	beforeEach(async () => {
		queryRunnerMock = {
			manager: {
				create: jest.fn(),
				save: jest.fn(),
			},
			connect: jest.fn(),
			startTransaction: jest.fn(),
			commitTransaction: jest.fn(),
			rollbackTransaction: jest.fn(),
			release: jest.fn(),
		} as unknown as jest.Mocked<QueryRunner>;

		dataSourceMock = {
			createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
		} as unknown as jest.Mocked<DataSource>;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FilmRepository,
				{
					provide: getRepositoryToken(Film),
					useValue: {
						create: jest.fn(),
						save: jest.fn(),
						findOneBy: jest.fn(),
						find: jest.fn(),
						delete: jest.fn(),
					},
				},
				{ provide: DataSource, useValue: dataSourceMock },
			],
		}).compile();

		filmRepository = module.get<FilmRepository>(FilmRepository);
		mockRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
	});

	describe('create film instance', () => {
		it('should create a new film instance', async () => {
			const filmData: Partial<Film> = { title: 'A New Hope' };
			const mockFilm = { ...filmData, id: 1 } as Film;

			mockRepository.create = jest.fn().mockReturnValue(mockFilm);

			const result = await filmRepository.createFilmInstance(filmData);
			expect(result).toEqual(mockFilm);
			expect(mockRepository.create).toHaveBeenCalledWith(filmData);
		});
	});

	describe('insert', () => {
		it('should save and return the film', async () => {
			const mockFilm = { id: 1, title: 'A New Hope' } as Film;

			mockRepository.save = jest.fn().mockResolvedValue(mockFilm);

			const result = await filmRepository.insert(mockFilm);
			expect(result).toEqual(mockFilm);
			expect(mockRepository.save).toHaveBeenCalledWith(mockFilm);
		});
	});

	describe('update by id', () => {
		it('should update the film with the provided data', async () => {
			const updatedFilm = { ...mockFilm1, ...mockUpdateFilmDto, editedBy: mockAdminUser, editedAt: expect.any(Date) };
			mockRepository.save = jest.fn().mockResolvedValue(mockFilm1);

			const result = await filmRepository.updateById(mockFilm1, mockUpdateFilmDto, mockAdminUser);

			expect(result).toEqual(updatedFilm);
			expect(mockRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					...updatedFilm,
					editedBy: mockAdminUser,
					editedAt: expect.any(Date),
				}),
			);
		});
	});

	describe('get one by id', () => {
		it('should return a film by ID', async () => {
			mockRepository.findOneBy = jest.fn().mockResolvedValue(mockFilm1);
			const result = await filmRepository.getOneById(mockFilm1.id);
			expect(result).toEqual(mockFilm1);
			expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: mockFilm1.id });
		});

		it('should return null if no film is found', async () => {
			mockRepository.findOneBy = jest.fn().mockResolvedValue(null);
			const result = await filmRepository.getOneById(999);
			expect(result).toBeNull();
		});
	});

	describe('get all', () => {
		it('should return all films', async () => {
			mockRepository.find = jest.fn().mockResolvedValue([mockFilm1, mockFilm2]);
			const result = await filmRepository.getAll();
			expect(result).toEqual([mockFilm1, mockFilm2]);
			expect(mockRepository.find).toHaveBeenCalled();
		});
	});

	describe('delete', () => {
		it('should delete a film by ID', async () => {
			await filmRepository.delete(1);
			expect(mockRepository.delete).toHaveBeenCalledWith(1);
		});
	});

	describe('create by star wars api', () => {
		it('should create and save a film with an external Star Wars ID', async () => {
			const newFilmData: Partial<Film> = { title: mockFilm1.title };
			const externalId = 42;
			const starWarsExternalId: StarWarsExternalId = { film: mockFilm1, external_id: externalId };

			queryRunnerMock.manager.create = jest.fn().mockReturnValueOnce(mockFilm1).mockReturnValueOnce(starWarsExternalId);
			queryRunnerMock.manager.save = jest.fn().mockResolvedValueOnce(mockFilm1).mockResolvedValueOnce(starWarsExternalId);

			const result = await filmRepository.createByStarWarsApi(newFilmData, externalId);

			expect(queryRunnerMock.connect).toHaveBeenCalled();
			expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
			expect(queryRunnerMock.manager.create).toHaveBeenCalledWith(Film, expect.objectContaining(newFilmData));
			expect(queryRunnerMock.manager.save).toHaveBeenCalledWith(mockFilm1);
			expect(queryRunnerMock.manager.create).toHaveBeenCalledWith(StarWarsExternalId, expect.objectContaining({ film: mockFilm1, external_id: externalId }));
			expect(queryRunnerMock.manager.save).toHaveBeenCalledWith(starWarsExternalId);
			expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
			expect(queryRunnerMock.release).toHaveBeenCalled();
			expect(result).toEqual(mockFilm1);
		});

		it('should rollback transaction on error', async () => {
			queryRunnerMock.manager.create = jest.fn().mockImplementation(() => {
				throw new Error('DB error');
			});

			await expect(filmRepository.createByStarWarsApi({ title: 'A New Hope' }, 42)).rejects.toThrow('Failed to insert film by Star Wars API: DB error');

			expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
			expect(queryRunnerMock.release).toHaveBeenCalled();
		});
	});
});
