import { Router } from 'express';
import { MatchesController } from '../controllers';

const router = Router();

router.get('/', MatchesController.list);

export default router;
