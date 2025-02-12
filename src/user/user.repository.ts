import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

export interface UserRepositoryInterface {
	create(username: string, password: string, isAdmin: boolean): Promise<User>;
	getOneById(id: number): Promise<User | null>;
	getOneByUsername(username: string): Promise<User | null>;
}

@Injectable()
export class UserRepository implements UserRepositoryInterface {
	constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

	async create(username: string, password: string, isAdmin: boolean): Promise<User> {
		const user = this.repository.create({
			username: username,
			password: password,
			isAdmin: isAdmin,
		});

		return await this.repository.save(user);
	}

	async getOneByUsername(username: string): Promise<User | null> {
		return await this.repository.findOneBy({ username });
	}

	async getOneById(id: number): Promise<User | null> {
		return await this.repository.findOneBy({ id });
	}
}
