import { Router } from 'express';
import { CreditScoreController } from '../controllers/creditScore.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Protected routes
router.use(authenticate);

// Credit score routes
router.post('/calculate', CreditScoreController.calculate);
router.get('/history', CreditScoreController.getHistory);
router.get('/latest', CreditScoreController.getLatest);
router.get('/factors', CreditScoreController.getFactors);

// Admin only routes
router.get('/all', authorize('admin'), CreditScoreController.getAllScores);
router.get('/user/:id', authorize('admin'), CreditScoreController.getUserScores);

export default router;