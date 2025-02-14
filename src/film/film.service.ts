import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Film } from 'src/entities/film.entity';
import { FilmRepository } from './film.repository';
import { User } from 'src/entities/user.entity';
import { CreateFilmDto } from './dto/request/create-film.request.dto';
import { validateSync } from '@nestjs/class-validator';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';

@Injectable()
export class FilmService {
	constructor(private readonly filmRepository: FilmRepository) {}

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
		const filmToUpdate = await this.filmRepository.getOneById(filmId);
		if (!filmToUpdate) throw new NotFoundException('Film not found');
		return await this.filmRepository.updateById(filmToUpdate, updateData, user);
	}

	async getOneById(filmId: number): Promise<Film | null> {
		return await this.filmRepository.getOneById(filmId);
	}
}
