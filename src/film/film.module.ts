import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { UserModule } from 'src/user/user.module';
import { FilmController } from './film.controller';
import { FilmRepository } from './film.repository';
import { FilmService } from './film.service';
import { StarWarsExternalIdRepository } from './star-wars-external-id/star-wars-external-id.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Film, StarWarsExternalId]), UserModule],
	controllers: [FilmController],
	providers: [FilmRepository, FilmService, StarWarsExternalIdRepository],
	exports: [FilmRepository, FilmService, StarWarsExternalIdRepository],
})
export class FilmModule {}
