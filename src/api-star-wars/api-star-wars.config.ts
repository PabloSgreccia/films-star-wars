export const STAR_WARS_API = 'https://swapi.dev/api/films/';

export interface IExternalStarWarsApiReponse {
	count: number;
	next: number;
	previous: number;
	results: IExternalStarWarsFilm[];
}

export interface IExternalStarWarsFilm {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string; // Example: '1977-05-25';
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
	created: Date;
	edited: Date;
	url: string;
}
