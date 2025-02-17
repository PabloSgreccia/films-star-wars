import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IExternalStarWarsFilm } from 'src/api-star-wars/api-star-wars.config';
import { ApiStarWarsService } from 'src/api-star-wars/api-star-wars.service';
import { CreateFilmDto } from 'src/film/dto/request/create-film.request.dto';
import { UpdateFilmDto } from 'src/film/dto/request/update-film.request.dto';
import { FilmService } from 'src/film/film.service';
import { StarWarsExternalIdRepository } from 'src/film/star-wars-external-id/star-wars-external-id.repository';

@Injectable()
export class CronService {
	constructor(
		private readonly apiStarWarsService: ApiStarWarsService,
		private readonly filmService: FilmService,
		private readonly starWarsExternalIdRepository: StarWarsExternalIdRepository,
	) {}

	@Cron(CronExpression.EVERY_2_HOURS)
	async synchronizeStarWarsFilms(): Promise<void> {
		const logger = new Logger();
		logger.log(`Star Wars Films Sincronization started at: ${new Date()}`);

		const films = await this.apiStarWarsService.getAllFilms();
		const promises = [];
		films.forEach((film) => promises.push(this.processFilm(film) as never));
		await Promise.all(promises);

		logger.log(`Star Wars Films Sinchronized at: ${new Date()}`);
	}

	private async processFilm(film: IExternalStarWarsFilm) {
		const externalIdIntance = await this.starWarsExternalIdRepository.getOneByExternalId(film.episode_id);
		const logger = new Logger();

		if (externalIdIntance) {
			const filmToProcess: UpdateFilmDto = {
				title: film.title,
				director: film.director,
				producer: film.producer,
				releaseDate: film.release_date,
				editedAt: null,
				editedBy: null,
				// description: null, // Si tambien quisieramos pisar este dato, descomentar esta linea
			};
			const updatedFilm = await this.filmService.updateById(externalIdIntance.film.id, filmToProcess);
			logger.log(`Star Wars Film UPDATED: ID ${updatedFilm.id} - TITLE: ${updatedFilm.title}`);
		} else {
			const filmToProcess: CreateFilmDto = {
				title: film.title,
				director: film.director,
				producer: film.producer,
				releaseDate: film.release_date,
			};
			const createdFilm = await this.filmService.createByStarWarsApi(filmToProcess, film.episode_id);
			logger.log(`Star Wars Film CREATED: ID ${createdFilm.id} - TITLE: ${createdFilm.title}`);
		}
	}
}
