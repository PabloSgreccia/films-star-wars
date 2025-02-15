import { IsString, IsNotEmpty, MinLength, Matches } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequestDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'The username of the user being registered.',
		example: 'user123',
	})
	username: string;

	@IsString()
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
		message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	@ApiProperty({
		description: 'The password of the user being registered. Password must contain at least one uppercase letter, one lowercase letter, and one number',
		example: 'Userpass123',
	})
	password: string;
}
