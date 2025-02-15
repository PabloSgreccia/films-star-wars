import { validateSync } from '@nestjs/class-validator';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Film } from 'src/entities/film.entity';
import { User } from 'src/entities/user.entity';
import { CreateFilmDto } from './dto/request/create-film.request.dto';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';
import { FilmRepository } from './film.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class FilmService {
	constructor(
		private readonly filmRepository: FilmRepository,
		private readonly userRepository: UserRepository,
	) {}

	async create(newFilmDto: CreateFilmDto, user: User): Promise<Film> {
		console.log({ newFilmDto, user });

		const errors = validateSync(newFilmDto);
		if (errors.length) throw new BadRequestException(`Error: ${errors.map((err) => err.toString()).join(', ')}`);

		if (!user) throw new BadRequestException('User is required');
		const userRegister = await this.userRepository.getOneById(user.id);
		if (!userRegister) throw new UnauthorizedException('User not found');
		if (!userRegister.isAdmin) throw new UnauthorizedException('Only admins can create films');

		const filmToIntance: Partial<Film> = {
			...newFilmDto,
			releaseDate: new Date(newFilmDto.releaseDate),
			// createdBy: userRegister,
			editedAt: null,
			editedBy: null,
		};

		const film = await this.filmRepository.createFilmInstance(filmToIntance, userRegister);
		console.log({ film });

		const createdFilm = await this.filmRepository.insert(film);
		return createdFilm;
	}

	async createByStarWarsApi(newFilmDto: CreateFilmDto, externalId: number): Promise<Film> {
		const errors = validateSync(newFilmDto);
		if (errors.length) throw new BadRequestException(`Error: ${errors.map((err) => err.toString()).join(', ')}`);

		const filmToIntance: Partial<Film> = {
			...newFilmDto,
			releaseDate: new Date(newFilmDto.releaseDate),
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
		if (!filmId) throw new BadRequestException('Must provide a film id');
		const film = await this.filmRepository.getOneById(filmId);
		if (!film) throw new NotFoundException('Film not found');
		return film;
	}

	async getAll(): Promise<Film[]> {
		return await this.filmRepository.getAll();
	}
}
