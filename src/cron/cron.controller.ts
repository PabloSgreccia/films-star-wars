// // TODO eliminar esto
// import { Controller, Get, Inject } from '@nestjs/common';
// import { CronService } from './cron.service';

// @Controller('cron')
// export class CronController {
// 	constructor(@Inject(CronService) private readonly cronService: CronService) {}

// 	@Get()
// 	async correrCron() {
// 		return await this.cronService.cronCadaDiaUnoYDieciseisDeCadaMes();
// 	}
// }
