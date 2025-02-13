import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
// import { CronController } from './cron.controller';

@Module({
	imports: [ScheduleModule.forRoot()],
	// controllers: [CronController], // TODO eliminar
	providers: [CronService],
})
export class CronModule {}
