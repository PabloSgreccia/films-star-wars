import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const dataSourceOptions: DataSourceOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],
	migrations: [__dirname + '/../database/migrations/*-migration{.ts,.js}'],
	migrationsTableName: 'migrations',
	synchronize: false,
	logging: true,
};
