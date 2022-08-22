import { Request, Response } from 'express';
import { MatchesService } from '../services';

export default class MatchesController {
  static async list(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchesService.list(inProgress === 'true');
    res.status(200).json(matches);
  }
}
