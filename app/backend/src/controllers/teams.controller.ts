import { Request, Response } from 'express';
import { TeamsService } from '../services';

export default class TeamsController {
  static async list(_req: Request, res: Response) {
    const teams = await TeamsService.list();
    res.status(200).json(teams);
  }

  static async find(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.find(+id);
    res.status(200).json(team);
  }
}
