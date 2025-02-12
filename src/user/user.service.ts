import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

	async findById(id: number): Promise<User | null> {
		return await this.userRepository.getOneById(id);
	}

	async create(username: string, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		return await this.userRepository.create(username, hashedPassword, false);
	}

	async findByUsername(username: string): Promise<User | null> {
		return this.userRepository.getOneByUsername(username);
	}
}
