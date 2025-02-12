import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/dataSource.config';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
// import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		// ConfigModule.forRoot(), // Carga variables de entorno desde .env // TODO ver si sirve de algo
		TypeOrmModule.forRoot(dataSourceOptions),
		UserModule,
		AuthModule,
	],
	controllers: [AppController, AuthController, UserController],
	providers: [
		AuthService,
		// UserRepository,
		// UserService,
		// TODO revisar si lo dejamos como arriba o como abajo (ver con Lucas)
		// {
		//   provide: AppDependences.USER_REPOSITORY,
		//   useClass: UserRepository,
		// },
		// {
		//   provide: AppDependences.USER_SERVICE,
		//   useClass: UserService,
		// },
	],
})
export class AppModule {}
