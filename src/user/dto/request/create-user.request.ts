import { IsBoolean, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateUserRequestDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsBoolean()
	isAdmin: boolean;
}
