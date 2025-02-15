import { IsString, IsNotEmpty, MinLength, Matches } from '@nestjs/class-validator';

export class RegisterUserRequestDto {
	@IsString()
	@IsNotEmpty({ message: 'Username is required' })
	username: string;

	@IsString()
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, {
		message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	password: string;
}
