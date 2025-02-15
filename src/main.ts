import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const puerto = process.env.PORT ?? 3000;
	console.log('Servidor corriendo en puerto', puerto);

	const config = new DocumentBuilder().setTitle('API Documentation').setDescription('Sitio de Películas').setVersion('1.0').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	await app.listen(puerto, '0.0.0.0');
}

bootstrap();
