import { Inject, Injectable } from '@nestjs/common';
import { FilmRepository } from './film.repository';
import { User } from 'src/entities/user.entity';
import { Film } from 'src/entities/film.entity';

@Injectable()
export class FilmService {
	constructor(@Inject(FilmRepository) private readonly filmRepository: FilmRepository) {}

	async create(title: string, description: string, director: string, producer: string, releaseDate: Date, user?: User): Promise<Film> {
		return await this.filmRepository.create(title, description, director, producer, releaseDate, user);
	}

	async update(id: number, updateData: Partial<Film>): Promise<void> {
		return await this.filmRepository.updateById(id, updateData);
	}
}
