import { NextFunction, Request, Response } from 'express';
import { DefinedHttpError } from 'restify-errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const error = (err: DefinedHttpError, req: Request, res: Response, _next: NextFunction) => {
  console.log(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Erro interno' });
};

export default error;
