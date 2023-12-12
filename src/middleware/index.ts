import {
  ConflictError,
  NotFoundError,
  ResourceExistsError,
  ValidationError,
} from '../errors';
import { NextFunction, Request, Response } from 'express';

import { Schema } from 'joi';

type RequestPart = 'body' | 'query' | 'params';

// Validation middleware factory
export function validateRequest(schema: Schema, part: RequestPart = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[part], {
      abortEarly: false,
    });

    if (error) {
      return next(new ValidationError(error.message));
    }

    next();
  };
}

export function errorHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: Replace with better error logging
  console.log({ err });

  res.status(500);

  if (err instanceof ValidationError) {
    return res.status(400).send({ error: err.message });
  }

  if (err instanceof ResourceExistsError) {
    return res.status(409).send({ error: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).send({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).send({ error: err.message });
  }

  // Default error code & msg
  return res.status(500).send({ error: 'An error has occured' });
}
