import { DataSource } from 'typeorm';
import { config } from '../config';

const { db } = config;

export const dataSource = new DataSource({
  type: 'postgres',
  host: db.host,
  port: 5432,
  username: db.user,
  password: db.password,
  database: db.database,
  logging: true,
  migrations: ['src/db/migrations/**/*.ts'],
  entities: ['src/db/entity/**/*.ts'],
});
