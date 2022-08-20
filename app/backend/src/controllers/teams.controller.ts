import { NextFunction, Request, Response } from 'express';
import TeamsServices from '../services/teams.service';

class TeamsController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamsServices.list();
      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await TeamsServices.find(+id);
      res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}

export default TeamsController;
