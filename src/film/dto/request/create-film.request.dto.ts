import { IsISO8601, IsNotEmpty, IsOptional, IsString, Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
	title: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@Length(0, 255, { message: 'Description must not exceed 255 characters' })
	description?: string | null;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(1, 255, { message: 'Director must be between 1 and 255 characters' })
	director: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Length(1, 255, { message: 'Producer must be between 1 and 255 characters' })
	producer: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsISO8601({}, { message: 'Release date must be in ISO 8601 format (YYYY-MM-DD)' })
	releaseDate: string;
}
