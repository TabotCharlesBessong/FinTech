import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CustomError } from '../utils/customError';

export class UserController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getById(req.user.id);
      if (!user) {
        throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      }

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
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await UserService.update(req.user.id, {
        firstName,
        lastName,
        email,
        password,
      });

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
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.delete(req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // Admin only routes
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      res.json({
        status: 'success',
        data: {
          users: users.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          })),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getById(req.params.id);
      if (!user) {
        throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
      }

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
        },
      });
    } catch (error) {
      next(error);
    }
  }
} 