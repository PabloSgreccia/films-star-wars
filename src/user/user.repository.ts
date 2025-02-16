import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
	constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

	async createUserInstance(userToInstance: Partial<User>): Promise<User> {
		return this.repository.create({ ...userToInstance });
	}

	async insert(userToCreate: User): Promise<User> {
		return await this.repository.save(userToCreate);
	}

	async getOneByUsername(username: string): Promise<User | null> {
		return await this.repository.findOneBy({ username });
	}

	async getOneById(id: number): Promise<User | null> {
		return await this.repository.findOneBy({ id });
	}
}
