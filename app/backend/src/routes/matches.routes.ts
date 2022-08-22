import { Router } from 'express';
import { MatchesController } from '../controllers';

const router = Router();

router.get('/', MatchesController.list);
router.post('/', MatchesController.add);
router.patch('/:id/finish', MatchesController.finish);

export default router;
