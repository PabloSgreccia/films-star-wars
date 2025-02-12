import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../dto/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY || 'undefined_secret_key',
		});
	}

	async validate(payload: TokenPayload) {
		return { userId: payload.id, username: payload.username, isAdmin: payload.isAdmin };
	}
}
