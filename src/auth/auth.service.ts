import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { PASSWORD_REGEX, USERNAME_REGEX } from './auth.enum';
import { RegisterUserRequestDto } from './dto/request/register.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';
import { TokenPayload } from './dto/token-payload';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<Omit<User, 'password'>> {
		const user = await this.userService.findByUsername(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		}
		throw new UnauthorizedException('Invalid credentials');
	}

	async login(user: TokenPayload): Promise<LoginResponseDto> {
		const token = this.jwtService.sign(user);
		return { access_token: token };
	}

	async register(userDto: RegisterUserRequestDto): Promise<LoginResponseDto> {
		await this.validateUserRegistration(userDto);
		const { password, username } = userDto;
		const user = await this.userService.create({ username, password, isAdmin: false });
		const payload: TokenPayload = { id: user.id, username: user.username, isAdmin: user.isAdmin };
		const token = this.jwtService.sign(payload);
		return { access_token: token };
	}

	async registerAdmin(userDto: RegisterUserRequestDto) {
		const { password, username } = userDto;
		await this.validateUserRegistration(userDto);
		const user = await this.userService.create({ username, password, isAdmin: true });
		return { message: 'Admin user created: ' + user.username };
	}

	private async validateUserRegistration({ password, username }: RegisterUserRequestDto) {
		if (!PASSWORD_REGEX.test(password)) {
			throw new BadRequestException(
				'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.',
			);
		}

		if (!USERNAME_REGEX.test(username)) {
			throw new BadRequestException('Username must be at least 4 characters long, and do not contain blank spaces.');
		}

		const userExists = await this.userService.findByUsername(username);
		if (userExists) throw new BadRequestException('Username already exists');
	}
}
