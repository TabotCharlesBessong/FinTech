import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { userSchemas } from '../utils/validationSchemas';

const router = Router();

router.post('/register', validate(userSchemas.register), AuthController.register);
router.post('/login', validate(userSchemas.login), AuthController.login);

export default router; 