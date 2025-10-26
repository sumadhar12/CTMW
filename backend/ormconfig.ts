import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Dhanush@1275',
  database: process.env.DB_NAME || 'cmt',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // for dev: true; in prod use migrations
  logging: false
});
