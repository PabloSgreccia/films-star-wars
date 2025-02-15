import { Module } from '@nestjs/common';
import { ApiStarWarsService } from './api-star-wars.service';
import { ApiStarWarsRepository } from './api-star-wars.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [HttpModule],
	providers: [ApiStarWarsService, ApiStarWarsRepository],
	exports: [ApiStarWarsService],
})
export class ApiStarWarsModule {}
