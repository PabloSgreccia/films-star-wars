import { validateSync } from '@nestjs/class-validator';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Film } from 'src/entities/film.entity';
import { User } from 'src/entities/user.entity';
import { CreateFilmDto } from './dto/request/create-film.request.dto';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';
import { FilmRepository } from './film.repository';

@Injectable()
export class FilmService {
	constructor(
		private readonly filmRepository: FilmRepository,
		// private readonly userService: UserService,
	) {}

	async create(newFilmDto: CreateFilmDto, user?: User): Promise<Film> {
		const errors = validateSync(newFilmDto);
		if (errors.length) throw new BadRequestException(`Error: ${errors.map((err) => err.toString()).join(', ')}`);

		const filmToIntance: Partial<Film> = {
			...newFilmDto,
			createdBy: user,
			editedAt: undefined,
			editedBy: undefined,
		};

		const film = await this.filmRepository.createFilmInstance(filmToIntance, user);
		const createdFilm = await this.filmRepository.insert(film);
		return createdFilm;
	}

	async createByStarWarsApi(newFilmDto: CreateFilmDto, externalId: number): Promise<Film> {
		const errors = validateSync(newFilmDto);
		if (errors.length) throw new BadRequestException(`Error: ${errors.map((err) => err.toString()).join(', ')}`);

		const filmToIntance: Partial<Film> = {
			...newFilmDto,
			createdBy: undefined,
			editedAt: undefined,
			editedBy: undefined,
		};

		const film = await this.filmRepository.createFilmInstance(filmToIntance);
		const createdFilm = await this.filmRepository.createByStarWarsApi(film, externalId);
		return createdFilm;
	}

	async updateById(filmId: number, updateData: UpdateFilmDto, user?: User): Promise<Film> {
		console.log({ filmId, updateData, user });

		// if (user) {
		//   const user = await this.userService.findById(user.id)
		// }

		const filmToUpdate = await this.filmRepository.getOneById(filmId);
		if (!filmToUpdate) throw new NotFoundException('Film not found');
		return await this.filmRepository.updateById(filmToUpdate, updateData, user);
	}

	async getOneById(filmId: number): Promise<Film | null> {
		return await this.filmRepository.getOneById(filmId);
	}

	async getAll(): Promise<Film[]> {
		return await this.filmRepository.getAll();
	}
}
