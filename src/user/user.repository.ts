import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

export interface UserRepositoryInterface {
  getOneById(id: number): Promise<Usuario | null>;
}

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
  ) {}

  async getOneById(id: number): Promise<Usuario | null> {
    return await this.repository.findOneBy({ id });
  }
}
