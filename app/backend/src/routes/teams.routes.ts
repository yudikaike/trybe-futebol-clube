import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import errorHandler from '../middlewares/errorHandler';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.list, errorHandler);
teamsRouter.get('/:id', TeamsController.find, errorHandler);

export default teamsRouter;
