import { Router } from 'express';
import { ValidationService } from '../services';
import UserController from '../controllers';

const router = Router();

router.get('/validate', UserController.validate);
router.post('/', ValidationService.loginBody, UserController.login);

export default router;
