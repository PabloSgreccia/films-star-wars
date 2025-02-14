import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity('star_wars_external_id')
export class StarWarsExternalId {
	@PrimaryColumn({ unique: true })
	film_id: number;

	@PrimaryColumn({ unique: true })
	external_id: number;

	@ManyToOne(() => Film, (film) => film.externalRefs, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'film_id' })
	film?: Film | null;
}
