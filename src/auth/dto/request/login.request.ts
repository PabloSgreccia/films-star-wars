import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	password: string;
}
