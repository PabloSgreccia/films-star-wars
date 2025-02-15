import { Test, TestingModule } from '@nestjs/testing';
import { RequestWithUserPayload } from 'src/auth/dto/token-payload';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegularUserGuard } from 'src/auth/guards/regular-user.guard';
import { FilmController } from 'src/film/film.controller';
import { FilmService } from 'src/film/film.service';
import { mockCreateFilmDto, mockFilm1, mockFilm2, mockUpdateFilmDto } from '../mocks/film.mock';
import { mockAdminUserTokenPayload } from '../mocks/user.mock';
import { Film } from 'src/entities/film.entity';

describe('FilmController', () => {
	let filmController: FilmController;
	let filmService: FilmService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FilmController],
			providers: [
				{
					provide: FilmService,
					useValue: {
						getAll: jest.fn().mockResolvedValue([new Film()]),
						create: jest.fn().mockResolvedValue(new Film()),
						getOneById: jest.fn().mockResolvedValue(new Film()),
						updateById: jest.fn().mockResolvedValue(new Film()),
						delete: jest.fn().mockResolvedValue(undefined),
					},
				},
			],
		})
			.overrideGuard(JwtAuthGuard)
			.useValue({ canActivate: jest.fn(() => true) })
			.overrideGuard(AdminUserGuard)
			.useValue({ canActivate: jest.fn(() => true) })
			.overrideGuard(RegularUserGuard)
			.useValue({ canActivate: jest.fn(() => true) })
			.compile();

		filmController = module.get<FilmController>(FilmController);
		filmService = module.get<FilmService>(FilmService);
	});

	it('should be defined', () => {
		expect(filmController).toBeDefined();
	});

	describe('get all', () => {
		it('should return an array of films', async () => {
			const result = await filmController.getAll();
			expect(result).toEqual([new Film()]);
			expect(filmService.getAll).toHaveBeenCalled();
		});
	});

	describe('create new film', () => {
		it('should create a new film', async () => {
			const result = await filmController.createNewFilm(mockAdminUserTokenPayload as RequestWithUserPayload, mockCreateFilmDto);
			expect(result).toEqual(new Film());
			expect(filmService.create).toHaveBeenCalledWith(mockCreateFilmDto, mockAdminUserTokenPayload.user);
		});
	});

	describe('get one', () => {
		it('should return a film by id', async () => {
			const result = await filmController.getOneById(1);
			expect(result).toEqual(new Film());
			expect(filmService.getOneById).toHaveBeenCalledWith(1);
		});
	});

	describe('updateById', () => {
		it('should update a film by id', async () => {
			const result = await filmController.updateById(1, mockUpdateFilmDto, mockAdminUserTokenPayload as RequestWithUserPayload);
			expect(result).toEqual(new Film());
			expect(filmService.updateById).toHaveBeenCalledWith(1, mockUpdateFilmDto, mockAdminUserTokenPayload.user);
		});
	});

	describe('deleteFilm', () => {
		it('should delete a film by id', async () => {
			await filmController.deleteFilm(1);
			expect(filmService.delete).toHaveBeenCalledWith(1);
		});
	});
});
