import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { StarWarsExternalId } from './star-wars-external-id.entity';

@Entity('film')
export class Film {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, type: String })
	title: string;

	@Column({ type: String, nullable: true, default: null })
	description: string | null;

	@Column({ nullable: false, type: String })
	director: string;

	@Column({ nullable: false, type: String })
	producer: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
	releaseDate: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
	editedAt: Date | null;

	@ManyToOne(() => User, (user) => user.editedFilms, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'editedBy' })
	editedBy: User | null;

	@ManyToOne(() => User, (user) => user.createdFilms, { onDelete: 'SET NULL' })
	@JoinColumn({ name: 'createdBy' })
	createdBy: User | null;

	@OneToOne(() => StarWarsExternalId, (starWarsExternalId) => starWarsExternalId.film, { nullable: true })
	externalRef: StarWarsExternalId | null;
}
