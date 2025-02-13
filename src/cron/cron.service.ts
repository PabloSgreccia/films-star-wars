import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronPeriods } from './cron.enum';
import Logger from 'src/config/logger';

@Injectable()
export class CronService {
	constructor() {} // @Inject(EmailDependencias.EMAIL_SERVICIO) private readonly emailServicio: EmailServicioInterface,

	@Cron(CronPeriods.CADA_DIA_UNO_Y_DIECISEIS_DE_CADA_MES)
	async cronCadaDiaUnoYDieciseisDeCadaMes(): Promise<void> {
		/*
      - pegarle a la api de start wars (traer todas las películas)
      - con los resultados, hay dos caminos
      1. si el id de una pelicula NO está en nuestra BD (comparar con external_id), crear el registro
      1.1. quizas convenga crear la tercer tabla "external_id_star_wars", quizas tambien otra con "external_apis_urls" con la url de la API
      2. si el id de una pelicula SI está en nuestra BD, comparar cual tiene el "edited_at" mas grande, si lo tiene la API, actualizar el valor
    */

		const logger = new Logger().log;
		logger.info(`Ejecución del cron: ${new Date()}`);
		return;
	}
}
