import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false, type: String, unique: true })
	username: string;

	@Column({ nullable: false, type: String })
	password: string;

	@Column({ nullable: false, type: Boolean, default: false })
	isAdmin: boolean = false;
}
