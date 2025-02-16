import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Film } from 'src/entities/film.entity';
import { User } from 'src/entities/user.entity';
import { FilmRepository } from 'src/film/film.repository';
import { FilmService } from 'src/film/film.service';
import { UserRepository } from 'src/user/user.repository';
import { mockCreateFilmDto, mockFilm1, mockFilm2, mockUpdateFilmDto } from '../mocks/film.mock';
import { mockAdminUser, mockAdminUserTokenPayload, mockRegularUser, mockRegularUserTokenPayload } from '../mocks/user.mock';

describe('FilmService', () => {
	let filmService: FilmService;
	let filmRepository: FilmRepository;
	let userRepository: UserRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FilmService,
				{
					provide: FilmRepository,
					useValue: {
						createFilmInstance: jest.fn().mockResolvedValue(mockFilm1),
						insert: jest.fn().mockResolvedValue(new Film()),
						createByStarWarsApi: jest.fn().mockResolvedValue(new Film()),
						getOneById: jest.fn().mockResolvedValue(mockFilm1),
						updateById: jest.fn().mockResolvedValue(new Film()),
						delete: jest.fn().mockResolvedValue(undefined),
						getAll: jest.fn().mockResolvedValue([mockFilm1, mockFilm2]),
					},
				},
				{
					provide: UserRepository,
					useValue: {
						getOneById: jest.fn().mockResolvedValue(new User()),
					},
				},
			],
		}).compile();

		filmService = module.get<FilmService>(FilmService);
		filmRepository = module.get<FilmRepository>(FilmRepository);
		userRepository = module.get<UserRepository>(UserRepository);
	});

	it('should be defined', () => {
		expect(filmService).toBeDefined();
	});

	describe('create', () => {
		it('should successfully create a new film', async () => {
			userRepository.getOneById = jest.fn().mockResolvedValueOnce(mockAdminUser);

			const result = await filmService.create(mockCreateFilmDto, mockAdminUserTokenPayload.user);
			expect(result).toBeInstanceOf(Film);
			expect(filmRepository.createFilmInstance).toHaveBeenCalledWith(
				expect.objectContaining({
					releaseDate: new Date(mockCreateFilmDto.releaseDate),
					createdBy: mockAdminUser,
					editedAt: null,
					editedBy: null,
				}),
			);
			expect(filmRepository.insert).toHaveBeenCalled();
		});

		it('should throw an UnauthorizedException if user is not an admin', async () => {
			userRepository.getOneById = jest.fn().mockResolvedValueOnce(mockRegularUser);
			await expect(filmService.create(mockCreateFilmDto, mockRegularUserTokenPayload.user)).rejects.toThrow(UnauthorizedException);
		});

		it('should throw a UnauthorizedException if user is not found', async () => {
			userRepository.getOneById = jest.fn().mockResolvedValueOnce(null);
			await expect(filmService.create(mockCreateFilmDto, mockRegularUserTokenPayload.user)).rejects.toThrow(UnauthorizedException);
		});
	});

	describe('get one', () => {
		it('should return a film by id', async () => {
			const result = await filmService.getOneById(1);
			expect(result).toBe(mockFilm1);
			expect(filmRepository.getOneById).toHaveBeenCalledWith(1);
		});

		it('should throw a NotFoundException if film does not exist', async () => {
			filmRepository.getOneById = jest.fn().mockResolvedValueOnce(null);
			await expect(filmService.getOneById(1)).rejects.toThrow(NotFoundException);
		});
	});

	describe('updateById', () => {
		it('should update a film by id', async () => {
			const result = await filmService.updateById(1, mockUpdateFilmDto, mockAdminUserTokenPayload.user);
			expect(result).toBeInstanceOf(Film);
			expect(filmRepository.updateById).toHaveBeenCalled();
		});

		it('should throw a NotFoundException if film does not exist', async () => {
			filmRepository.getOneById = jest.fn().mockResolvedValueOnce(null);
			await expect(filmService.updateById(1, mockUpdateFilmDto, mockRegularUserTokenPayload.user)).rejects.toThrow(NotFoundException);
		});
	});

	describe('delete', () => {
		it('should delete a film by id', async () => {
			await filmService.delete(1);
			expect(filmRepository.delete).toHaveBeenCalledWith(1);
		});
	});

	describe('getAll', () => {
		it('should return an array of films', async () => {
			const result = await filmService.getAll();
			expect(result).toEqual([mockFilm1, mockFilm2]);
			expect(filmRepository.getAll).toHaveBeenCalled();
		});
	});
});
