import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IExternalStarWarsFilm } from 'src/api-star-wars/api-star-wars.config';
import { ApiStarWarsService } from 'src/api-star-wars/api-star-wars.service';
import { CreateFilmDto } from 'src/film/dto/request/create-film.request.dto';
import { UpdateFilmDto } from 'src/film/dto/request/update-film.request.dto';
import { FilmService } from 'src/film/film.service';
import { StarWarsExternalIdService } from 'src/film/star-wars-external-id/star-wars-external-id.service';

@Injectable()
export class CronService {
	constructor(
		private readonly apiStarWarsService: ApiStarWarsService,
		private readonly filmService: FilmService,
		private readonly starWarsExternalIdService: StarWarsExternalIdService,
	) {}

	@Cron(CronExpression.EVERY_MINUTE)
	async synchronizeStarWarsFilms(): Promise<void> {
		const logger = new Logger();
		logger.debug(`Star Wars Films Sincronization started at: ${new Date()}`);

		const films = await this.apiStarWarsService.getAllFilms();
		const promises = [];
		films.forEach((film) => promises.push(this.processFilm(film) as never));
		await Promise.all(promises);

		logger.debug(`Star Wars Films Sinchronized at: ${new Date()}`);
	}

	private async processFilm(film: IExternalStarWarsFilm) {
		const externalIdIntance = await this.starWarsExternalIdService.findByExternalId(film.episode_id);

		if (externalIdIntance) {
			const filmToProcess: UpdateFilmDto = {
				title: film.title,
				director: film.director,
				producer: film.producer,
				releaseDate: new Date(film.release_date),
				// description: null,
			};
			await this.filmService.updateById(externalIdIntance.film_id, filmToProcess);
		} else {
			const filmToProcess: CreateFilmDto = {
				title: film.title,
				director: film.director,
				producer: film.producer,
				releaseDate: new Date(film.release_date),
			};
			await this.filmService.createByStarWarsApi(filmToProcess, film.episode_id);
		}
	}
}
