import express, { Request, Response } from 'express';

import apiRoutes from './routes';
import morgan from 'morgan';

const app = express();

app.use(morgan('common'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.send('OK');
});

app.use('/api', apiRoutes);

app.use((req: Request, res: Response) => {
  return res.status(404).send('NOT FOUND');
});

export default app;

export function startServer(port: string | number) {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
