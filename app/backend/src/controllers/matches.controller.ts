import { NextFunction, Request, Response } from 'express';
import MatchesServices from '../services/matches.service';

class MatchesController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const matches = await MatchesServices.list(inProgress === 'true');
      res.status(200).json(matches);
    } catch (err) {
      next(err);
    }
  }
}

export default MatchesController;
