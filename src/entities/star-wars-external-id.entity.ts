import { Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Film } from './film.entity';

@Entity('star_wars_external_id')
export class StarWarsExternalId {
	@PrimaryColumn({ unique: true })
	external_id: number;

	@OneToOne(() => Film, (film) => film.externalRef, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'filmId' })
	film: Film;
}
