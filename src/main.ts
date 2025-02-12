import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const puerto = process.env.PORT ?? 3000;
  console.log('Servidor corriendo en puerto', puerto);
  await app.listen(puerto, '0.0.0.0');
}

bootstrap();
