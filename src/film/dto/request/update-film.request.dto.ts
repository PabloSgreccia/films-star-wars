import { IsDate, IsISO8601, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateFilmDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string | null;

	@IsOptional()
	@IsString()
	director?: string;

	@IsOptional()
	@IsString()
	producer?: string;

	@IsOptional()
	@IsISO8601({}, { message: 'Release date must be in ISO 8601 format (YYYY-MM-DD)' })
	releaseDate?: string;

	@IsOptional()
	@IsDate()
	editedAt?: Date | null;

	@IsOptional()
	@IsDate()
	editedBy?: Date | null;
}
