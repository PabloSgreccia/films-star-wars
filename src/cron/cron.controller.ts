import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CronService } from './cron.service';
import { ApiDocumentation } from 'src/config/api-documentation';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
	constructor(private readonly cronService: CronService) {}

	@ApiDocumentation({
		description: 'Manually runs cron that sincronizes star wars api data.',
		posibleResponses: [200],
		requiresJWT: true,
	})
	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Post('star-wars-api')
	@HttpCode(200)
	async correrCron() {
		return await this.cronService.synchronizeStarWarsFilms();
	}
}
