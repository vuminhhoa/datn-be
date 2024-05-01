import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  dotenv.config({ path: '.env.development' });
}
if (env === 'production') {
  dotenv.config();
}

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: true,
  }
);
