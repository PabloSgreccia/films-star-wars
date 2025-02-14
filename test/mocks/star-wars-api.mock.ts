import { IExternalStarWarsFilm } from 'src/api-star-wars/api-star-wars.config';

export const mockStarWarsFilm1: IExternalStarWarsFilm = {
	title: 'Film 1',
	episode_id: 1,
	opening_crawl: 'any',
	director: 'Director 1',
	producer: 'Producer 1',
	release_date: '2021-01-01',
	characters: [],
	planets: [],
	starships: [],
	vehicles: [],
	species: [],
	url: 'any',
	created: new Date(),
	edited: new Date(),
};

export const mockStarWarsFilm2: IExternalStarWarsFilm = {
	title: 'Film 2',
	episode_id: 2,
	opening_crawl: 'any',
	director: 'Director 2',
	producer: 'Producer 2',
	release_date: '2022-01-01',
	characters: [],
	planets: [],
	starships: [],
	vehicles: [],
	species: [],
	url: 'any',
	created: new Date(),
	edited: new Date(),
};

export const mockStarWarsFilms: IExternalStarWarsFilm[] = [mockStarWarsFilm1, mockStarWarsFilm2];
