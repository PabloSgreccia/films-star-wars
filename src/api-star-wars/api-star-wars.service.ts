import { Inject, Injectable } from '@nestjs/common';
import Logger from 'src/config/logger';
import { IExternalStarWarsApiReponse, IExternalStarWarsFilm } from './api-star-wars.config';
import { ApiStarWarsRepository } from './api-star-wars.repository';

@Injectable()
export class ApiStarWarsService {
	constructor(@Inject(ApiStarWarsRepository) private readonly apiStarWarsRepository: ApiStarWarsRepository) {}

	async getAllFilms(): Promise<IExternalStarWarsFilm[]> {
		try {
			const starWarsFilmsData: IExternalStarWarsApiReponse = await this.apiStarWarsRepository.getAllFilms();
			const starWarsFilmsList: IExternalStarWarsFilm[] = starWarsFilmsData.results;
			return starWarsFilmsList;
		} catch (error) {
			const logger = new Logger().log;
			logger.info(JSON.stringify(error));
			return [];
		}
	}
}
