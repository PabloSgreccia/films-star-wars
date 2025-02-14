import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilmService } from './film.service';

@ApiTags('film')
@Controller('film')
export class FilmController {
	constructor(private readonly filmService: FilmService) {}

	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Get('/all')
	public async onlyAdmin(): Promise<any> {
		// return await this.filmService.getAll();
	}
}
