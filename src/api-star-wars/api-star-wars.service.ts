import { Injectable, Logger } from '@nestjs/common';
import { IExternalStarWarsApiReponse, IExternalStarWarsFilm } from './api-star-wars.config';
import { ApiStarWarsRepository } from './api-star-wars.repository';

@Injectable()
export class ApiStarWarsService {
	constructor(private readonly apiStarWarsRepository: ApiStarWarsRepository) {}

	async getAllFilms(): Promise<IExternalStarWarsFilm[]> {
		try {
			const starWarsFilmsData: IExternalStarWarsApiReponse = await this.apiStarWarsRepository.getAllFilms();
			const starWarsFilmsList: IExternalStarWarsFilm[] = starWarsFilmsData.results;
			return starWarsFilmsList;
		} catch (error) {
			const logger = new Logger();
			logger.error(JSON.stringify(error));
			return [];
		}
	}
}
