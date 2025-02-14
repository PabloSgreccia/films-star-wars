import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
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

	async login(user: User) {
		const payload: TokenPayload = { id: user.id, username: user.username, isAdmin: user.isAdmin };
		const token = this.jwtService.sign(payload);
		return { access_token: token };
	}

	// const refreshTokenExpiresIn: string = '30d'; // Vencimiento del refresh token
	// const authTokenExpiresInMinutes: number = 10; // Vencimiento del auth token en minutos
	// const authTokenExpiresInSeconds: string = `${authTokenExpiresInMinutes * 60}s`; // Vencimiento del auth token en segundos (usado en el token)
	// const changuiMinutes: number = 60; // El "refresh token" se ejecuta cuando el "auth token" se vence... este valor hace referencia a cuantos minutos de vencimiento del "auth token" permitir

	// TODO eliminar si no implemento el refresh
	// async refreshToken(user: User, refreshToken: string, accesToken: string) {
	// 	if (!refreshToken || !accesToken) throw new UnauthorizedException();

	// 	// const tokenData: any = jwtDecode(accesToken);
	// 	const tokenData: any = {};
	// 	const tokenExpDate: Date = new Date(tokenData.exp * 1000);

	// 	// Calculamos si permitimos refrescar el token en base a los tiempos definidos
	// 	const milisegundosOriginales = tokenExpDate.getTime();
	// 	const milisegundosASumar = changuiMinutes * 60 * 1000;
	// 	const nuevaFechaEnMilisegundos = milisegundosOriginales + milisegundosASumar;
	// 	const fechaDeVencimientoAValidar = new Date(nuevaFechaEnMilisegundos);
	// 	const dateToday = new Date();

	// 	// Valido que la fehca/hora/minutos de expiración del token de acceso (fechaDeVencimientoAValidar) vs dateToday
	// 	// Si fechaDeVencimientoAValidar < dateToday, NO se renueva el token
	// 	if (fechaDeVencimientoAValidar < dateToday) throw new UnauthorizedException();

	// 	const payload = {
	// 		id: user.id,
	// 		user: user.username,
	// 	};

	// 	const newAccessToken = await this.jwtService.signAsync(payload, {
	// 		expiresIn: authTokenExpiresInSeconds,
	// 		secret: process.env.JWT_SECRET_KEY,
	// 	});

	// 	const newRefreshToken = await this.jwtService.signAsync(payload, {
	// 		expiresIn: refreshTokenExpiresIn,
	// 		secret: process.env.JWT_REFRESH_TOKEN,
	// 	});

	// 	return { newAccessToken, newRefreshToken };
	// }
}
