import morgan from 'morgan';
import { config } from './config';
import express, { Request, Response } from 'express';
import { dataSource } from './db/data-source';

try {
  dataSource.initialize();
} catch (error) {
  console.log({ error });
  throw error;
}

const app = express();

app.use(morgan('common'));

app.get('/', (req: Request, res: Response) => {
  return res.send('OK');
});

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
