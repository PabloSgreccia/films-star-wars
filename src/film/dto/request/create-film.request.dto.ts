import { Type } from '@nestjs/class-transformer';
import { IsISO8601, IsNotEmpty, IsOptional, IsString, Length } from '@nestjs/class-validator';
import { OmitType } from '@nestjs/swagger';
import { Film } from 'src/entities/film.entity';

// export class CreateFilmDto extends OmitType(Film, ['id', 'createdBy', 'editedBy', 'editedAt', 'externalRefs', 'description']) {
export class CreateFilmDto {
	@IsNotEmpty()
	@IsString()
	@Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
	title: string;

	@IsOptional()
	@IsString()
	@Length(0, 255, { message: 'Description must not exceed 255 characters' })
	description?: string | null;

	@IsNotEmpty()
	@IsString()
	@Length(1, 255, { message: 'Director must be between 1 and 255 characters' })
	director: string;

	@IsNotEmpty()
	@IsString()
	@Length(1, 255, { message: 'Producer must be between 1 and 255 characters' })
	producer: string;

	@IsNotEmpty()
	@IsISO8601({}, { message: 'Release date must be in ISO 8601 format (YYYY-MM-DD)' })
	releaseDate: string;
	// @Type(() => Date)
	// @Transform(({ value }) => new Date(value))
}
