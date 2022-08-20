import { Router } from 'express';
import { TeamsController } from '../controllers';

const router = Router();

router.get('/', TeamsController.list);
router.get('/:id', TeamsController.find);

export default router;
