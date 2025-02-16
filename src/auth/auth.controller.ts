import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserRequestDto } from './dto/request/register.request.dto';
import { AdminUserGuard } from './guards/admin-user.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseDto } from './dto/response/login.response.dto';
import { RequestWithUserPayload } from './dto/token-payload';
import { ApiDocumentation } from 'src/config/api-documentation';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiDocumentation({
		title: 'Register a new admin user',
		description: 'Registers a new user with admin privileges. Requires admin rights to access this endpoint.',
		posibleResponses: [201, 400, 403],
		requiresJWT: true,
		bodyType: RegisterUserRequestDto,
	})
	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Post('register-admin')
	async registerAdminUser(@Body() body: RegisterUserRequestDto) {
		return this.authService.registerAdmin(body);
	}

	@ApiDocumentation({
		title: 'Register a new regular user',
		description: 'Registers a new user with regular privileges.',
		posibleResponses: [201, 400],
		requiresJWT: false,
		bodyType: RegisterUserRequestDto,
		responseType: LoginResponseDto,
	})
	@Post('register')
	async registerRegularUser(@Body() body: RegisterUserRequestDto): Promise<LoginResponseDto> {
		return this.authService.register(body);
	}

	@ApiDocumentation({
		description: 'Logs in a user and returns a JWT token.',
		posibleResponses: [200, 401],
		requiresJWT: false,
		bodyType: RegisterUserRequestDto,
		responseType: LoginResponseDto,
	})
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(200)
	async login(@Request() req: RequestWithUserPayload): Promise<LoginResponseDto> {
		return this.authService.login(req.user);
	}

	@ApiDocumentation({
		description:
			'No le puse lógica porque requiere un poco mas de complejidad que no viene al caso. Igualmente hay dos estrategias para manejar un logout: 1. borrar el token en clien side (para este caso, deberíamos hacer esto) 2. tener un registro de black listed tokens y evaluarlo en el AdminUserGuard y RegularUserGuard',
		requiresJWT: true,
	})
	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@HttpCode(200)
	async logout() {
		// No le puse lógica porque requiere un poco mas de complejidad que no viene al caso.
		// Igualmente hay dos estrategias para manejar un logout:
		// 1. borrar el token en clien side (para este caso, deberíamos hacer esto)
		// 2. tener un registro de black listed tokens y evaluarlo en el AdminUserGuard y RegularUserGuard
		return;
	}
}
