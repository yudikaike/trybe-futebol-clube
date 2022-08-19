import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();

loginRouter.post('/', LoginController.login);

export default loginRouter;
