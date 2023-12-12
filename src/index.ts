import 'reflect-metadata';

import { initDbConnection, registerRepositories } from './db';

import { config } from './config';
import { setupApp } from './app';

async function bootstrap() {
  console.log('Connecting to db...');
  await initDbConnection();
  console.log('Connected to DB !');

  console.log('Registering repos...');
  registerRepositories();
  console.log('Register complete!');

  const app = setupApp();

  console.log('Starting server...');
  app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
  });
}

bootstrap();
