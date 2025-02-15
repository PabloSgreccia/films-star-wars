import { ApiProperty } from '@nestjs/swagger';

export class FilmResponseDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	title: string;

	@ApiProperty({ example: 'string' })
	description: string | null;

	@ApiProperty()
	director: string;

	@ApiProperty()
	producer: string;

	@ApiProperty()
	releaseDate: Date;
}
