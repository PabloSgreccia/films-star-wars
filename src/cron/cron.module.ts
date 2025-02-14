import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiStarWarsModule } from 'src/api-star-wars/api-star-wars.module';
import { FilmModule } from 'src/film/film.module';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';

@Module({
	imports: [ScheduleModule.forRoot(), FilmModule, ApiStarWarsModule],
	controllers: [CronController],
	providers: [CronService],
	exports: [CronService],
})
export class CronModule {}
