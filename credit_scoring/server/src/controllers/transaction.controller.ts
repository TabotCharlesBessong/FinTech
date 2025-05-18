import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { CustomError } from '../utils/customError';

export class TransactionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.create({
        ...req.body,
        userId: req.user.id,
      });

      res.status(201).json({
        status: 'success',
        data: { transaction },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, type, categoryId, startDate, endDate } = req.query;
      
      const transactions = await TransactionService.getAll({
        userId: req.user.id,
        page: Number(page),
        limit: Number(limit),
        type: type as string,
        categoryId: categoryId as string,
        startDate: startDate as string,
        endDate: endDate as string,
      });

      res.json({
        status: 'success',
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.getById(req.params.id);
      if (!transaction || transaction.userId !== req.user.id) {
        throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
      }

      res.json({
        status: 'success',
        data: { transaction },
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.getById(req.params.id);
      if (!transaction || transaction.userId !== req.user.id) {
        throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
      }

      const updatedTransaction = await TransactionService.update(req.params.id, req.body);
      res.json({
        status: 'success',
        data: { transaction: updatedTransaction },
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await TransactionService.getById(req.params.id);
      if (!transaction || transaction.userId !== req.user.id) {
        throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
      }

      await TransactionService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const stats = await TransactionService.getStats({
        userId: req.user.id,
        startDate: startDate as string,
        endDate: endDate as string,
      });

      res.json({
        status: 'success',
        data: { stats },
      });
    } catch (error) {
      next(error);
    }
  }
} 