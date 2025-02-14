import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmController } from './film.controller';
import { Film } from 'src/entities/film.entity';
import { FilmRepository } from './film.repository';
import { FilmService } from './film.service';
import { StarWarsExternalIdRepository } from './star-wars-external-id/star-wars-external-id.repository';
import { StarWarsExternalId } from 'src/entities/star-wars-external-id.entity';
import { StarWarsExternalIdService } from './star-wars-external-id/star-wars-external-id.service';

@Module({
	imports: [TypeOrmModule.forFeature([Film, StarWarsExternalId])],
	controllers: [FilmController],
	providers: [FilmRepository, FilmService, StarWarsExternalIdRepository, StarWarsExternalIdService],
	exports: [FilmRepository, FilmService, StarWarsExternalIdRepository, StarWarsExternalIdService],
})
export class FilmModule {}
