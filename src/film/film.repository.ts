import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';

@Injectable()
export class FilmRepository {
	constructor(
		@InjectRepository(Film) private readonly filmRepository: Repository<Film>,
		// @InjectRepository(StarWarsExternalId) private readonly starWarsExternalIdRepository: Repository<StarWarsExternalId>,
		private readonly dataSource: DataSource, // Inject DataSource for transactions
	) {}

	async createFilmInstance(newFilm: Partial<Film>): Promise<Film> {
		return this.filmRepository.create({ ...newFilm });
	}

	async insert(newFilm: Film): Promise<Film> {
		return await this.filmRepository.save(newFilm);
	}

	// async create(newFilm: Partial<Film>, user?: User): Promise<Film> {
	// 	const film = this.filmRepository.create({
	// 		...newFilm,
	// 		createdBy: user,
	// 	});
	// 	return await this.filmRepository.save(film);
	// }

	async updateById(film: Film, updateData: UpdateFilmDto, user?: User): Promise<Film> {
		const filmToUpdate: Partial<Film> = Object.assign(film, updateData, { editedBy: user, editedAt: user ? new Date() : null });
		return await this.filmRepository.save(filmToUpdate);
	}

	async getOneById(id: number): Promise<Film | null> {
		return await this.filmRepository.findOneBy({ id });
	}

	async getAll(): Promise<Film[]> {
		return await this.filmRepository.find();
	}

	async delete(id: number): Promise<void> {
		await this.filmRepository.delete(id);
	}

	async createByStarWarsApi(newFilmDto: Partial<Film>, externalId: number): Promise<Film> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const filmToInsert = queryRunner.manager.create(Film, { ...newFilmDto });
			const createdFilm = await queryRunner.manager.save(filmToInsert);

			const starWarsFilm = queryRunner.manager.create(StarWarsExternalId, {
				film: createdFilm,
				external_id: externalId,
			});
			await queryRunner.manager.save(starWarsFilm);

			await queryRunner.commitTransaction();
			return createdFilm;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new Error(`Failed to insert film by Star Wars API: ${error.message}`);
		} finally {
			await queryRunner.release();
		}
	}
}
