import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import errorHandler from '../middlewares/errorHandler';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.list, errorHandler);
matchesRouter.post('/', MatchesController.add, errorHandler);
matchesRouter.patch('/:id/finish', MatchesController.finish, errorHandler);

export default matchesRouter;
