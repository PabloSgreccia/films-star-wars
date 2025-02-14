import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IExternalStarWarsFilm } from 'src/api-star-wars/api-star-wars.config';
import { ApiStarWarsService } from 'src/api-star-wars/api-star-wars.service';
import { Film } from 'src/entities/film.entity';
import { FilmService } from 'src/film/film.service';
import { StarWarsExternalIdService } from 'src/film/star-wars-external-id/star-wars-external-id.service';
// import Logger from 'src/config/logger';

@Injectable()
export class CronService {
	constructor(
		@Inject(ApiStarWarsService) private readonly apiStarWarsService: ApiStarWarsService,
		@Inject(FilmService) private readonly filmService: FilmService,
		@Inject(StarWarsExternalIdService) private readonly starWarsExternalIdService: StarWarsExternalIdService,
	) {}

	// @Cron(CronExpression.EVERY_5_MINUTES)
	@Cron('0 */1 * * * *')
	async synchronizeStarWarsFilms(): Promise<void> {
		console.log(`\n\n\n SE VA A EJECUTAR EL CRON \n\n\n`);

		/*
      - pegarle a la api de start wars (traer todas las películas)
      - con los resultados, hay dos caminos
      1. si el id de una pelicula NO está en nuestra BD (comparar con external_id), crear el registro
      1.1. quizas convenga crear la tercer tabla "external_id_star_wars", quizas tambien otra con "external_apis_urls" con la url de la API
      2. si el id de una pelicula SI está en nuestra BD, comparar cual tiene el "edited_at" mas grande, si lo tiene la API, actualizar el valor
    */

		const films = await this.apiStarWarsService.getAllFilms();
		if (films.length === 0) return;
		// films.forEach(async (film) => await this.processFilm(film));

		const promesas = [];
		films.forEach((film) => {
			console.log(`\n foreach`);

			promesas.push(this.processFilm(film) as never);
		});
		await Promise.all(promesas);

		const logger = new Logger();
		logger.debug('Called every 30 seconds');

		// const logger = new Logger().log;
		// logger.info(`Star Wars Films Sinchronized at ${new Date()}`);
		return;
	}

	private async processFilm(film: IExternalStarWarsFilm) {
		// por cada pelicula ver si exite en la tabla externa
		//   si no existe
		//      Intanciar Film
		//      Guardarlo en la base de datos (Film)
		//      con el id, intanciar el external
		//      Guardarlo en la base de datos (External)
		//   si existe
		//      Intanciar Film
		//      pisar el film
		const externalIdIntance = await this.starWarsExternalIdService.findByExternalId(film.episode_id);
		if (externalIdIntance) {
			const updatedFilm: Partial<Film> = {
				createdBy: undefined,
				editedAt: undefined,
				editedBy: undefined,
				description: '',
				director: film.director,
				producer: film.producer,
				releaseDate: new Date(film.release_date),
				title: film.title,
			};
			await this.filmService.update(externalIdIntance.film_id, updatedFilm);
			console.log('actualizado');
		} else {
			const createdFilm = await this.filmService.create(film.title, '', film.director, film.producer, new Date(film.release_date));
			await this.starWarsExternalIdService.create(createdFilm.id, film.episode_id);
			console.log('creado');
		}

		// const totalRegistrosPendientes = await this.contarRegistrosPendientesPorFirmar(idParroquia);
		// const existeAntiguedadDe1MesDeRegistros = await this.obtenerAntiguedadDeRegistrosPorParroquia(idParroquia);
		// if (totalRegistrosPendientes >= 50 || existeAntiguedadDe1MesDeRegistros) {
		// 	const emailsDeUsuarios = await this.obtenerEmailsDeUsuariosPorParroquia(idParroquia);
		// 	const datosDeParroquia = await this.repositorioParroquia.obtenerPorIdConLocalidad(idParroquia);
		// 	const parametrosDelEmail = {
		// 		emailsDeUsuarios,
		// 		datosDeParroquia,
		// 	};
		// 	await this.emailServicio.enviarMailDeAvisoSobreRegistrosPendientes(parametrosDelEmail.emailsDeUsuarios, parametrosDelEmail.datosDeParroquia);
		// 	return true;
		// }
		// return false;
	}
}
