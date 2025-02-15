import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserRequestDto } from './dto/request/create-user.request';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findById(id: number): Promise<User | null> {
		return await this.userRepository.getOneById(id);
	}

	async create({ isAdmin, password, username }: CreateUserRequestDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);

		const userToInstance: Partial<User> = {
			username,
			password: hashedPassword,
			isAdmin,
			createdFilms: undefined,
			editedFilms: undefined,
		};

		const userInstance = await this.userRepository.createUserInstance(userToInstance);
		return await this.userRepository.insert(userInstance);
	}

	async findByUsername(username: string): Promise<User | null> {
		const user = await this.userRepository.getOneByUsername(username);
		return user;
	}
}
