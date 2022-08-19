import { Router } from 'express';
import { ValidationService } from '../services';
import UserController from '../controllers';

const router = Router();

router.post('/', ValidationService.loginBody, UserController.login);

export default router;
