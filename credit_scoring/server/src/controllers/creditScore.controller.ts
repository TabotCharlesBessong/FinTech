import { Request, Response, NextFunction } from 'express';
import { CreditScoreService } from '../services/creditScore.service';
import { CustomError } from '../utils/customError';

export class CreditScoreController {
  static async calculate(req: Request, res: Response, next: NextFunction) {
    try {
      const creditScore = await CreditScoreService.calculate(req.user.id);
      res.json({
        status: 'success',
        data: { creditScore },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const history = await CreditScoreService.getHistory({
        userId: req.user.id,
        page: Number(page),
        limit: Number(limit),
      });

      res.json({
        status: 'success',
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLatest(req: Request, res: Response, next: NextFunction) {
    try {
      const creditScore = await CreditScoreService.getLatest(req.user.id);
      if (!creditScore) {
        throw new CustomError('Credit score not found', 404, 'CREDIT_SCORE_NOT_FOUND');
      }

      res.json({
        status: 'success',
        data: { creditScore },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFactors(req: Request, res: Response, next: NextFunction) {
    try {
      const factors = await CreditScoreService.getFactors(req.user.id);
      res.json({
        status: 'success',
        data: { factors },
      });
    } catch (error) {
      next(error);
    }
  }

  // Admin only routes
  static async getAllScores(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const scores = await CreditScoreService.getAllScores({
        page: Number(page),
        limit: Number(limit),
      });

      res.json({
        status: 'success',
        data: scores,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserScores(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const scores = await CreditScoreService.getUserScores({
        userId: req.params.id,
        page: Number(page),
        limit: Number(limit),
      });

      res.json({
        status: 'success',
        data: scores,
      });
    } catch (error) {
      next(error);
    }
  }
} 