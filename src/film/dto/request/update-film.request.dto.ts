import { IsDate, IsOptional, IsString } from '@nestjs/class-validator';

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
	@IsDate()
	releaseDate?: Date;

	@IsOptional()
	@IsDate()
	editedAt?: Date | null;

	@IsOptional()
	@IsDate()
	editedBy?: Date | null;
}
