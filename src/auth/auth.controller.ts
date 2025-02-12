import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// @Post('register')
	// async register(@Body() body: { username: string; password: string }) {
	//   return this.authService.register(body.username, body.password);
	// }

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(LocalAuthGuard)
	@Post('auth/logout')
	async logout(@Request() req) {
		return req.logout();
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}

	// @Post('/login')
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'OK', type: LoginResponse })
	// @ApiResponse({ status: 401, description: 'Unauthorized' })
	// async login(
	//   @Body() body: LoginRequest,
	//   @Req() req: Request,
	// ): Promise<LoginResponse> {
	//   const logger = new Logger().log;
	//   const loggerData = {
	//     user: body.nickName,
	//     userAgent: req.headers['browser'],
	//   };
	//   logger.info(loggerData);
	//   return await this.authService.login(body);
	// }

	// @Post('/refresh')
	// @UseGuards(RefreshJwtGuard)
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'OK', type: RefreshTokenResponse })
	// @ApiResponse({ status: 401, description: 'Unauthorized' })
	// async refreshToken(
	//   @Body() body: RefreshTokenRequest,
	// ): Promise<RefreshTokenResponse | undefined> {
	//   return;
	//   // return await this.authService.refreshToken(body.user, body.accessToken);
	// }
}
