import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

enum errorCodes {
  ValidationError = StatusCodes.BAD_REQUEST,
}

const errorHandler: ErrorRequestHandler = (
  { name, message },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = errorCodes[name];
  if (!status) return res.status(500).json({ message });
  return res.status(Number(status)).json({ message });
};

export default errorHandler;
