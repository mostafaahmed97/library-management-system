import 'reflect-metadata';
import { config } from './config';
import { startServer } from './api';
import { initDbConnection } from './db';

async function bootstrap() {
  await initDbConnection();
  startServer(config.port || 3000);
}

bootstrap();
