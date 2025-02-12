import { Inject, Injectable } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { UserDependences } from './enums/user-dependences';
import { UserRepositoryInterface } from './user.repository';

export interface UserServiceInterface {
  getById(id: number): Promise<Usuario | null>;
}

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(UserDependences.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getById(id: number): Promise<Usuario | null> {
    return await this.userRepository.getOneById(id);
  }
}
