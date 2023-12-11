import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';

type RequestPart = 'body' | 'query';

// Middleware factory
export function validateRequest(schema: Schema, part: RequestPart = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[part], {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      return res.status(400).send({
        error: error.message,
      });
    }

    next();
  };
}
