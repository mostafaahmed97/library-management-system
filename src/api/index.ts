import morgan from 'morgan';
import express, { Request, Response } from 'express';

const app = express();

app.use(morgan('common'));

app.get('/', (req: Request, res: Response) => {
  return res.send('OK');
});

export function startServer(port: string | number) {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
