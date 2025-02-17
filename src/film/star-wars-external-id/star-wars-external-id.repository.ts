import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StarWarsExternalIdRepository {
	constructor(@InjectRepository(StarWarsExternalId) private readonly repository: Repository<StarWarsExternalId>) {}

	async getOneByExternalId(externalId: number): Promise<StarWarsExternalId | null> {
		return await this.repository.findOne({ where: { external_id: externalId }, relations: { film: true } });
	}
}
