import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
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
		const user = await this.userRepository.getOneByUsername(username);
		if (!user) throw new NotFoundException('User not found');
		return user;
	}
}
