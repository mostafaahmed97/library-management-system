import { createBook } from '../validators';
import { validateRequest } from '../middleware';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  return res.send('Getting all books');
});

router.get('/:id', async (req: Request, res: Response) => {
  return res.send(`Getting id ${req.params.id}`);
});

router.post(
  '/',
  validateRequest(createBook),
  async (req: Request, res: Response) => {
    console.log({ body: req.body, query: req.query, params: req.params });

    return res.send('Adding new book');
  }
);

router.patch('/:id', async (req: Request, res: Response) => {
  return res.send(`Patching id ${req.params.id}`);
});

router.delete('/:id', async (req: Request, res: Response) => {
  return res.send(`Deleting id ${req.params.id}`);
});

export default router;
