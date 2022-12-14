import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import errorHandler from '../middlewares/errorHandler';

const loginRouter = Router();

loginRouter.get('/validate', LoginController.validate, errorHandler);
loginRouter.post('/', LoginController.login, errorHandler);

export default loginRouter;
