import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Usuario } from 'src/entities/usuario.entity';
import { UserDependences } from './enums/user-dependences';
import { UserServiceInterface } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserDependences.USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async obtenerPersona(
    @Param('id') id: number,
  ): Promise<Usuario | null> {
    return await this.userService.getById(id);
  }
}
