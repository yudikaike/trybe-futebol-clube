import { Request, Response } from 'express';
import { MatchesService, ValidationService } from '../services';
import error from '../middlewares';

export default class MatchesController {
  static async list(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchesService.list(inProgress === 'true');
    res.status(200).json(matches);
  }

  static async add(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) throw error.custom('UnauthorizedError', 'Token is required');
    await ValidationService.token(token);
    const match = await MatchesService.add(req.body);
    res.status(201).json(match);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.finish(+id);
    res.status(200).json({ message: 'Finished' });
  }
}
