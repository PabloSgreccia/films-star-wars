import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { UserDependences } from './enums/user-dependences';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UserController],
  providers: [
    {
      provide: UserDependences.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: UserDependences.USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: UserDependences.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: UserDependences.USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
