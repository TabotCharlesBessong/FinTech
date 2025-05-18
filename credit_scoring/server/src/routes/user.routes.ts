import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { userSchemas } from '../utils/validationSchemas';

const router = Router();

// Protected routes
router.use(authenticate);

// User profile routes
router.get('/profile', UserController.getProfile);
router.patch('/profile', validate(userSchemas.update), UserController.updateProfile);
router.delete('/profile', UserController.deleteProfile);

// Admin only routes
router.get('/', authorize('admin'), UserController.getAllUsers);
router.get('/:id', authorize('admin'), UserController.getUserById);

export default router; 