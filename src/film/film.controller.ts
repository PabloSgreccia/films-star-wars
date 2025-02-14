import { Body, Controller, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilmService } from './film.service';
import { RegularUserGuard } from 'src/auth/guards/regular-user.guard';
import { Film } from 'src/entities/film.entity';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';

@ApiTags('Film')
@Controller('film')
export class FilmController {
	constructor(private readonly filmService: FilmService) {}

	@UseGuards(JwtAuthGuard)
	@Get('all')
	@ApiOperation({ summary: 'Get all films' })
	@ApiResponse({ status: 200, description: 'Returns all films', type: [Film] })
	public async getAll(): Promise<Film[]> {
		return await this.filmService.getAll();
	}

	@UseGuards(JwtAuthGuard, RegularUserGuard)
	@Get(':filmId')
	@ApiOperation({ summary: 'Get a film by ID' })
	@ApiParam({ name: 'filmId', type: 'number', description: 'The ID of the film to retrieve' })
	@ApiResponse({ status: 200, description: 'Returns a single film', type: Film })
	@ApiResponse({ status: 404, description: 'Film not found' })
	public async getOneById(@Param('filmId') filmId: number): Promise<Film | null> {
		return await this.filmService.getOneById(filmId);
	}

	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Patch(':filmId')
	@ApiOperation({ summary: 'Update a film by ID' })
	@ApiParam({ name: 'filmId', type: 'number', description: 'The ID of the film to update' })
	@ApiBody({ description: 'The film data to update', type: UpdateFilmDto })
	@ApiResponse({ status: 200, description: 'Successfully updated the film' })
	@ApiResponse({ status: 400, description: 'Bad request, invalid data or unauthorized' })
	public async UpdateById(@Param('filmId') filmId: number, @Body() updateData: UpdateFilmDto, @Request() req): Promise<any> {
		return await this.filmService.updateById(filmId, updateData, req.user);
	}
}
