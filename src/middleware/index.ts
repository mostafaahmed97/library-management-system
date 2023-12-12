import { NextFunction, Request, Response } from 'express';

import { Schema } from 'joi';

type RequestPart = 'body' | 'query' | 'params';

// Middleware factory
export function validateRequest(schema: Schema, part: RequestPart = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[part], {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        error: error.message,
      });
    }

    next();
  };
}
