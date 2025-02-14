import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegularUserGuard } from 'src/auth/guards/regular-user.guard';
import { UserService } from './user.service';
// import { UserServiceInterface } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Get('/admin')
	public async onlyAdmin(): Promise<any> {
		return { message: 'hello admin' };
	}
	@UseGuards(JwtAuthGuard, RegularUserGuard)
	@Get('/regular')
	public async onlyRegular(): Promise<any> {
		return 'hello regular';
	}

	// TODO eliminar este endpoint
	// @UseGuards(JwtAuthGuard)
	// @Get('/:id')
	// @HttpCode(HttpStatus.OK)
	// public async obtenerPersona(@Param('id') id: number): Promise<User | null> {
	// 	return await this.userService.findById(id);
	// }
}
