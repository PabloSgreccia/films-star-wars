import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<Omit<User, 'password'>> {
		const userWithoutPassword = await this.authService.validateUser(username, password);
		if (!userWithoutPassword) throw new UnauthorizedException();
		return userWithoutPassword;
	}
}
