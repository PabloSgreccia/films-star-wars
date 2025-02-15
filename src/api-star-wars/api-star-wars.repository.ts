import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IExternalStarWarsApiReponse, STAR_WARS_API } from './api-star-wars.config';

@Injectable()
export class ApiStarWarsRepository {
	async getAllFilms(): Promise<IExternalStarWarsApiReponse> {
		try {
			const response = await axios.get(STAR_WARS_API);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) throw new Error(`Failed to fetch data from ${STAR_WARS_API}: ${error.message}`);
			throw new Error(`Unexpected error fetching Star Wars API: ${error}`);
		}
	}
}
