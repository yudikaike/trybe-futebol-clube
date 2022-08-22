import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const router = Router();

router.get('/home', LeaderboardController.home);
router.get('/away', LeaderboardController.away);

export default router;
