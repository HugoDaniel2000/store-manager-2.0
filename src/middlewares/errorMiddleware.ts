import { Request, Response } from 'express';
import { DefinedHttpError } from 'restify-errors';

const error = (err: DefinedHttpError, req: Request, res: Response) => {
  console.log(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Erro interno' });
};

export default error;
