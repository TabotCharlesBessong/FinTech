import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { CustomError } from '../utils/customError';

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json({
        status: 'success',
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // const { type } = req.query;
      const categories = await CategoryService.getAll();
      res.json({
        status: 'success',
        data: { categories },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getById(req.params.id);
      if (!category) {
        throw new CustomError('Category not found', 404, 'CATEGORY_NOT_FOUND');
      }

      res.json({
        status: 'success',
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getById(req.params.id);
      if (!category) {
        throw new CustomError('Category not found', 404, 'CATEGORY_NOT_FOUND');
      }

      const updatedCategory = await CategoryService.update(req.params.id, req.body);
      res.json({
        status: 'success',
        data: { category: updatedCategory },
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getById(req.params.id);
      if (!category) {
        throw new CustomError('Category not found', 404, 'CATEGORY_NOT_FOUND');
      }

      await CategoryService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 