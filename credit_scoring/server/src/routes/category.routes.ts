import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { categorySchemas } from '../utils/validationSchemas';

const router = Router();

// Protected routes
router.use(authenticate);

// Category routes
router.post('/', authorize('admin'), validate(categorySchemas.create), CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.patch('/:id', authorize('admin'), validate(categorySchemas.update), CategoryController.update);
router.delete('/:id', authorize('admin'), CategoryController.delete);

export default router; 