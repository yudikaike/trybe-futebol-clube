import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import errorHandler from '../middlewares/errorHandler';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.homeLeaderboard, errorHandler);
leaderboardRouter.get('/away', LeaderboardController.awayLeaderboard, errorHandler);
leaderboardRouter.get('/', LeaderboardController.leaderboard, errorHandler);

export default leaderboardRouter;
