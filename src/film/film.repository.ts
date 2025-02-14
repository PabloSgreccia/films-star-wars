import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmRepository {
	constructor(@InjectRepository(Film) private readonly repository: Repository<Film>) {}

	async create(title: string, description: string, director: string, producer: string, releaseDate: Date, user?: User): Promise<Film> {
		const film = this.repository.create({
			title,
			description,
			director,
			producer,
			releaseDate,
			createdBy: user,
		});

		return await this.repository.save(film);
	}

	async updateById(id: number, updateData: Partial<Film>): Promise<void> {
		await this.repository.update(id, updateData);
	}
}
