import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { CustomError } from '../utils/customError';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, role } = req.body;

      // Check if user exists
      const existingUser = await UserService.getByEmail(email);
      if (existingUser) {
        throw new CustomError('Email already registered', 400, 'EMAIL_EXISTS');
      }

      // Create user (password will be hashed by User model hooks)
      const user = await UserService.create({
        email,
        password,
        firstName,
        lastName,
        role,
      });

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await UserService.getByEmail(email);
      if (!user) {
        throw new CustomError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
      }

      // Check password using the User model's comparePassword method
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new CustomError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
} 