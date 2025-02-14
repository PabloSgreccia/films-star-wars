import { Controller, Post, UseGuards } from '@nestjs/common';
import { AdminUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
	constructor(private readonly cronService: CronService) {}

	@UseGuards(JwtAuthGuard, AdminUserGuard)
	@Post('star-wars')
	async correrCron() {
		return await this.cronService.synchronizeStarWarsFilms();
	}
}
