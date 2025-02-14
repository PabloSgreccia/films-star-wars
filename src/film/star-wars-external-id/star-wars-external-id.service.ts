import { Inject, Injectable } from '@nestjs/common';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { StarWarsExternalIdRepository } from './star-wars-external-id.repository';

@Injectable()
export class StarWarsExternalIdService {
	constructor(@Inject(StarWarsExternalIdRepository) private readonly starWarsExternalIdRepository: StarWarsExternalIdRepository) {}

	async create(filmId: number, externalId: number): Promise<StarWarsExternalId> {
		return await this.starWarsExternalIdRepository.create(filmId, externalId);
	}

	async findByExternalId(id: number): Promise<StarWarsExternalId | null> {
		return await this.starWarsExternalIdRepository.getOneByExternalId(id);
	}

	// async findByUsername(username: string): Promise<User | null> {
	// 	const user = await this.filmRepository.getOneByUsername(username);
	// 	if (!user) throw new NotFoundException('User not found');
	// 	return user;
	// }
}
