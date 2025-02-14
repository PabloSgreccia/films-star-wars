import { Module } from '@nestjs/common';
import { ApiStarWarsService } from './api-star-wars.service';
import { ApiStarWarsRepository } from './api-star-wars.repository';

@Module({
	providers: [ApiStarWarsService, ApiStarWarsRepository],
	exports: [ApiStarWarsService],
})
export class ApiStarWarsModule {}
