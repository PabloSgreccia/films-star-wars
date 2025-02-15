import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUserPayload } from 'src/auth/dto/token-payload';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegularUserGuard } from 'src/auth/guards/regular-user.guard';
import { ApiDocumentation } from 'src/config/api-documentation';
import { Film } from 'src/entities/film.entity';
import { CreateFilmDto } from './dto/request/create-film.request.dto';
import { UpdateFilmDto } from './dto/request/update-film.request.dto';
import { FilmResponseDto } from './dto/response/film.response.dto';
import { FilmService } from './film.service';

@ApiTags('Film')
@Controller('film')
export class FilmController {
	constructor(private readonly filmService: FilmService) {}

	@ApiDocumentation({
		description: 'Returns all the films.',
		posibleResponses: [200],
		requiresJWT: true,
		responseType: [Film],
	})
	@UseGuards(JwtAuthGuard)
	@Get('all')
	public async getAll(): Promise<Film[]> {
		return await this.filmService.getAll();
	}

	@ApiDocumentation({
		description: 'Creates a new film. Only admin allowed',
		posibleResponses: [201, 400, 401, 404],
		requiresJWT: true,
		bodyType: CreateFilmDto,
		responseType: FilmResponseDto,
	})
	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Post()
	public async createNewFilm(@Request() req: RequestWithUserPayload, @Body() newFilmDto: CreateFilmDto): Promise<Film> {
		return await this.filmService.create(newFilmDto, req.user);
	}

	@ApiDocumentation({
		description: 'Get a film by ID.',
		posibleResponses: [200, 404],
		requiresJWT: true,
		paramsType: [{ name: 'filmId', type: 'number' }],
		responseType: FilmResponseDto,
	})
	@UseGuards(JwtAuthGuard, RegularUserGuard)
	@Get(':filmId')
	public async getOneById(@Param('filmId') filmId: number): Promise<Film | null> {
		return await this.filmService.getOneById(filmId);
	}

	@ApiDocumentation({
		description: 'Update a film by ID. Only admins are allowed',
		posibleResponses: [200, 400, 401, 404],
		requiresJWT: true,
		paramsType: [{ name: 'filmId', type: 'number' }],
		bodyType: UpdateFilmDto,
		responseType: FilmResponseDto,
	})
	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Patch(':filmId')
	public async updateById(@Param('filmId') filmId: number, @Body() updateData: UpdateFilmDto, @Request() req: RequestWithUserPayload): Promise<Film> {
		return await this.filmService.updateById(filmId, updateData, req.user);
	}

	@ApiDocumentation({
		description: 'Deletes a film by ID. Only admins are allowed',
		posibleResponses: [200, 400, 401],
		requiresJWT: true,
		paramsType: [{ name: 'filmId', type: 'number' }],
	})
	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Delete(':filmId')
	public async deleteFilm(@Param('filmId') filmId: number): Promise<void> {
		return await this.filmService.delete(filmId);
	}
}
