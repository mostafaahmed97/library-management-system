import 'reflect-metadata';

import app from './app';
import { config } from './config';
import { initDbConnection } from './db';

async function bootstrap() {
  console.log('Connecting to db...');
  await initDbConnection();

  console.log('Starting server...');
  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });
}

bootstrap();
