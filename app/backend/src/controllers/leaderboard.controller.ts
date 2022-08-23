import { Request, Response } from 'express';
import { HomeLeaderboardService, AwayLeaderboardService, LeaderboardService } from '../services';

export default class LeaderboardController {
  static async home(req: Request, res: Response) {
    const filter = req.url.split('/')[1];
    const leaderboard = await HomeLeaderboardService.list(filter);
    res.status(200).json(leaderboard);
  }

  static async away(req: Request, res: Response) {
    const filter = req.url.split('/')[1];
    const leaderboard = await AwayLeaderboardService.list(filter);
    res.status(200).json(leaderboard);
  }

  static async general(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.list('general');
    res.status(200).json(leaderboard);
  }
}
