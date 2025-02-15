import { IsString, IsNotEmpty, MinLength, Matches } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PASSWORD_REGEX, USERNAME_REGEX } from 'src/auth/auth.enum';

export class RegisterUserRequestDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4, { message: 'Username must be at least 4 characters long' })
	@Matches(USERNAME_REGEX, { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' })
	@ApiProperty({ description: 'must be at least 4 characters long.', example: 'user123' })
	username: string;

	@IsString()
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@Matches(PASSWORD_REGEX, { message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' })
	@ApiProperty({ description: 'must be at least 6 characters long and contain at least one uppercase, one lowercase, and one number', example: 'Userpass123' })
	password: string;
}
