import { NextFunction, Request, Response } from 'express';
import ValidateServices from '../services/validate.service';
import MatchesServices from '../services/matches.service';

class MatchesController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const matches = await MatchesServices.listFiltered(inProgress === 'true');
        res.status(200).json(matches);
      } else {
        const matches = await MatchesServices.list();
        res.status(200).json(matches);
      }
    } catch (err) {
      next(err);
    }
  }

  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw ValidateServices
          .customError('TokenNotFoundError', 'Authentication token is required');
      }
      await ValidateServices.validateToken(token);
      const match = req.body;
      const newMatch = await MatchesServices.add(match);
      res.status(201).json(newMatch);
    } catch (err) {
      next(err);
    }
  }

  static async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchesServices.finish(+id);
      res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  }

  static async updateScore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newScore = req.body;
      await MatchesServices.update(newScore, +id);
      res.status(200).json({ message: 'Score updated!' });
    } catch (err) {
      next(err);
    }
  }
}

export default MatchesController;
