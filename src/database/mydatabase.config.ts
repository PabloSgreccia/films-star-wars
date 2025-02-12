import { dataSourceOptions } from 'src/database/dataSource.config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
