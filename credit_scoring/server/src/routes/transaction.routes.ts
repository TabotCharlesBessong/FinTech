import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { transactionSchemas } from '../utils/validationSchemas';

const router = Router();

// Protected routes
router.use(authenticate);

// Transaction routes
router.post('/', validate(transactionSchemas.create), TransactionController.create);
router.get('/', TransactionController.getAll);
router.get('/stats', TransactionController.getStats);
router.get('/:id', TransactionController.getById);
router.patch('/:id', validate(transactionSchemas.update), TransactionController.update);
router.delete('/:id', TransactionController.delete);

export default router; 