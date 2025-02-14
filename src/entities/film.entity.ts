import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	releaseDate: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
	editedAt: Date | null;

	@ManyToOne(() => User, (user) => user.editedFilms)
	@JoinColumn({ name: 'edited_by' })
	editedBy: User | null;

	@ManyToOne(() => User, (user) => user.createdFilms)
	@JoinColumn({ name: 'created_by' })
	createdBy: User | null;

	@OneToMany(() => StarWarsExternalId, (starWarsExternalId) => starWarsExternalId.film)
	externalRefs: StarWarsExternalId[];
}
