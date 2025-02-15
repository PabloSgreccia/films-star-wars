import { validateSync } from '@nestjs/class-validator';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from 'src/auth/dto/token-payload';
import { Film } from 'src/entities/film.entity';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { CreateFilmDto } from './dto/request/create-film.request.dto';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';
import { FilmRepository } from './film.repository';

@Injectable()
export class FilmService {
	constructor(
		private readonly filmRepository: FilmRepository,
		private readonly userRepository: UserRepository,
	) {}

	async create(newFilmDto: CreateFilmDto, user: TokenPayload): Promise<Film> {
		const errors = validateSync(newFilmDto);
		if (errors.length) throw new BadRequestException(`Error: ${errors.map((err) => err.toString()).join(', ')}`);

		if (!user) throw new BadRequestException('User is required');
		const userRegister = await this.userRepository.getOneById(user.id);
		if (!userRegister) throw new UnauthorizedException('User not found');
		if (!userRegister.isAdmin) throw new UnauthorizedException('Only admins can create films');

		const filmToIntance: Partial<Film> = {
			...newFilmDto,
			releaseDate: new Date(newFilmDto.releaseDate),
			createdBy: userRegister,
			editedAt: null,
			editedBy: null,
		};

		const film = await this.filmRepository.createFilmInstance(filmToIntance);
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

	async updateById(filmId: number, updateData: UpdateFilmDto, user?: TokenPayload): Promise<Film> {
		console.log({ filmId, updateData, user });

		let updaterUser: User | undefined = undefined;
		if (user) {
			const userInstance = await this.userRepository.getOneById(user.id);
			if (!userInstance) throw new BadRequestException('User not found');
			updaterUser = userInstance;
		}

		const filmToUpdate = await this.filmRepository.getOneById(filmId);
		if (!filmToUpdate) throw new NotFoundException('Film not found');
		return await this.filmRepository.updateById(filmToUpdate, updateData, updaterUser);
	}

	async getOneById(filmId: number): Promise<Film | null> {
		if (!filmId) throw new BadRequestException('Must provide a film id');
		const film = await this.filmRepository.getOneById(filmId);
		if (!film) throw new NotFoundException('Film not found');
		return film;
	}

	async delete(id: number): Promise<void> {
		await this.filmRepository.delete(id);
	}

	async getAll(): Promise<Film[]> {
		return await this.filmRepository.getAll();
	}
}
