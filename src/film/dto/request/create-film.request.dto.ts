import { IsDate, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { OmitType } from '@nestjs/swagger';
import { Film } from 'src/entities/film.entity';

export class CreateFilmDto extends OmitType(Film, ['id', 'createdBy', 'editedBy', 'editedAt', 'externalRefs', 'description']) {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	description?: string | null;

	@IsNotEmpty()
	@IsString()
	director: string;

	@IsNotEmpty()
	@IsString()
	producer: string;

	@IsNotEmpty()
	@IsDate()
	releaseDate: Date;
}
