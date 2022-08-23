import { NextFunction, Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.service';

class LeaderboardController {
  static async homeLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await LeaderboardServices.getTeams('home');
      const sortedLeaderboard = LeaderboardServices.sortLeaderboard(leaderboard);
      console.log(sortedLeaderboard);
      res.status(200).json(sortedLeaderboard);
    } catch (err) {
      next(err);
    }
  }

  static async awayLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await LeaderboardServices.getTeams('away');
      const sortedLeaderboard = LeaderboardServices.sortLeaderboard(leaderboard);
      console.log(sortedLeaderboard);
      res.status(200).json(sortedLeaderboard);
    } catch (err) {
      next(err);
    }
  }

  static async leaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await LeaderboardServices.getTeams('general');
      const sortedLeaderboard = LeaderboardServices.sortLeaderboard(leaderboard);
      console.log(sortedLeaderboard);
      res.status(200).json(sortedLeaderboard);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
