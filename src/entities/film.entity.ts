import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { StarWarsExternalId } from './star-wars-external-id.entity';

@Entity('film')
export class Film {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, type: String })
	title: string;

	@Column({ type: String })
	description: string;

	@Column({ nullable: false, type: String })
	director: string;

	@Column({ nullable: false, type: String })
	producer: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	releaseDate: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	editedAt: Date;

	@ManyToOne(() => User, (user) => user.editedFilms)
	@JoinColumn({ name: 'edited_by' })
	editedBy: User;

	@ManyToOne(() => User, (user) => user.createdFilms)
	@JoinColumn({ name: 'created_by' })
	createdBy: User;

	@OneToMany(() => StarWarsExternalId, (starWarsExternalId) => starWarsExternalId.film)
	externalRefs: StarWarsExternalId[];
}
