import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/dataSource.config';
import { ApiStarWarsModule } from './api-star-wars/api-star-wars.module';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CronController } from './cron/cron.controller';
import { CronModule } from './cron/cron.module';
import { FilmController } from './film/film.controller';
import { FilmModule } from './film/film.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule, UserModule, CronModule, FilmModule, ApiStarWarsModule],
	controllers: [AppController, AuthController, CronController, FilmController],
})
export class AppModule {}
