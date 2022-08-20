import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

enum ErrorCodes {
  UnauthorizedError = StatusCodes.UNAUTHORIZED,
  ValidationError = StatusCodes.BAD_REQUEST,
  NotFoundError = StatusCodes.NOT_FOUND,
}

export default class error {
  static handler({ name, message }: Error, _req: Request, res: Response, _next: NextFunction) {
    const status = ErrorCodes[name as keyof typeof ErrorCodes];
    if (!status) return res.status(500).json({ message });
    res.status(+status).json({ message });
  }

  static custom(name: string, message: string): Error {
    const err = new Error(message);
    err.name = name;
    throw err;
  }
}
