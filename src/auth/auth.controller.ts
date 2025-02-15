import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserRequestDto } from './dto/request/register.request.dto';
import { AdminUserGuard } from './guards/admin-user.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Post('register-admin')
	async registerAdminUser(@Body() body: RegisterUserRequestDto) {
		return this.authService.registerAdmin(body);
	}

	@Post('register')
	async registerRegularUser(@Body() body: RegisterUserRequestDto) {
		return this.authService.register(body);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@HttpCode(200)
	async logout() {
		// No lo voy a hacer porque requiere un poco mas de complejidad que no viene al caso
		// Igualmente hay dos estrategias para manejar un logout:
		// 1. borrar el token en clien side (para este caso, deberíamos hacer esto)
		// 2. tener un registro de black listed tokens y evaluarlo en el AdminUserGuard y RegularUserGuard
		return;
	}

	// TODO agregar refresh token?
}
