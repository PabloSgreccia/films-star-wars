import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Film } from './film.entity';

@Entity('user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, type: String, unique: true })
	username: string;

	@Column({ nullable: false, type: String })
	password: string;

	@Column({ nullable: false, type: Boolean, default: false })
	isAdmin: boolean = false;

	@OneToMany(() => Film, (film) => film.editedBy)
	editedFilms: Film[];

	@OneToMany(() => Film, (film) => film.createdBy)
	createdFilms: Film[];
}
