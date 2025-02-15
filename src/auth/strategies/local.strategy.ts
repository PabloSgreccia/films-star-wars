import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../dto/token-payload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<TokenPayload> {
		const userWithoutPassword = await this.authService.validateUser(username, password);
		if (!userWithoutPassword) throw new UnauthorizedException();
		return userWithoutPassword;
	}
}
