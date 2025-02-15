import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;
}
