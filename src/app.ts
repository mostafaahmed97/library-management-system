import express, { Express, Request, Response } from 'express';

import { apiRoutes } from './routes';
import { errorHandlingMiddleware } from './middleware';
import morgan from 'morgan';

export function setupApp(): Express {
  const app = express();

  app.use(morgan('common'));
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    return res.send('SERVER WORKING');
  });

  console.log('Generating routes for api...');
  for (const route of apiRoutes) {
    app.use(`/api/${route.path}`, route.generator());
  }
  console.log('Route generation complete');

  app.use((req: Request, res: Response) => {
    return res.status(404).send('NOT FOUND');
  });

  app.use(errorHandlingMiddleware);

  return app;
}
