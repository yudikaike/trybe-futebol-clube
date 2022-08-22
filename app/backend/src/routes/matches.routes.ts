import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import errorHandler from '../middlewares/errorHandler';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.list, errorHandler);
matchesRouter.post('/', MatchesController.add, errorHandler);

export default matchesRouter;
