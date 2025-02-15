import { Film } from 'src/entities/film.entity';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';

export const mockFilm1: Film = {
	id: 1,
	title: 'Star Wars: A New Hope',
	description: 'The Rebel Alliance battles the evil Galactic Empire in a struggle to restore freedom and justice in the galaxy.',
	director: 'George Lucas',
	producer: 'Gary Kurtz',
	releaseDate: new Date(1977, 4, 25),
	editedAt: null,
	editedBy: null,
	createdBy: null,
	externalRef: null,
};

export const mockFilm2: Film = {
	id: 2,
	title: 'Star Wars: The Empire Strikes Back',
	description:
		'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda while his friends are pursued by Darth Vader.',
	director: 'Irvin Kershner',
	producer: 'Gary Kurtz',
	releaseDate: new Date(1980, 4, 21),
	editedAt: null,
	editedBy: null,
	createdBy: null,
	externalRef: null,
};
