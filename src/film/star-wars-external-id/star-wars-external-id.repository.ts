import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StarWarsExternalIdRepository {
	constructor(@InjectRepository(StarWarsExternalId) private readonly repository: Repository<StarWarsExternalId>) {}

	// async create(filmId: number, externalId: number): Promise<StarWarsExternalId> {
	// 	const starWarsFilm = this.repository.create({
	// 		film_id: filmId,
	// 		external_id: externalId,
	// 	});
	// 	return await this.repository.save(starWarsFilm);
	// }

	async getOneByExternalId(externalId: number): Promise<StarWarsExternalId | null> {
		return await this.repository.findOneBy({ external_id: externalId });
	}
}
