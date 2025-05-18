import { CreditScore, Transaction, User } from '../models';
import { CustomError } from '../utils/customError';
import { Op } from 'sequelize';

interface PaginationParams {
  page?: number;
  limit?: number;
}

export class CreditScoreService {
  static async calculate(userId: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
    }

    // Get user's transactions for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const transactions = await Transaction.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: sixMonthsAgo,
        },
      },
    });

    // Calculate credit score based on various factors
    const score = await this.calculateScore(transactions);
    const factors = this.getFactors(transactions);

    // Create new credit score record
    return CreditScore.create({
      userId,
      score,
      factors,
      calculationDate: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
    });
  }

  private static async calculateScore(transactions: Transaction[]) {
    let score = 700; // Base score

    // Payment history (30% of score)
    const paymentHistory = this.calculatePaymentHistory(transactions);
    score += paymentHistory * 0.3;

    // Credit utilization (30% of score)
    const creditUtilization = this.calculateCreditUtilization(transactions);
    score += creditUtilization * 0.3;

    // Length of credit history (15% of score)
    const creditHistory = this.calculateCreditHistory(transactions);
    score += creditHistory * 0.15;

    // Types of credit (10% of score)
    const creditTypes = this.calculateCreditTypes(transactions);
    score += creditTypes * 0.1;

    // Recent credit inquiries (5% of score)
    const recentInquiries = this.calculateRecentInquiries(transactions);
    score += recentInquiries * 0.05;

    // Ensure score is within range
    return Math.min(Math.max(Math.round(score), 300), 850);
  }

  private static calculatePaymentHistory(transactions: Transaction[]) {
    if (transactions.length === 0) return 0;

    const totalTransactions = transactions.length;
    const onTimePayments = transactions.filter(t => 
      t.type === 'expense' && t.amount > 0
    ).length;

    return (onTimePayments / totalTransactions) * 100;
  }

  private static calculateCreditUtilization(transactions: Transaction[]) {
    if (transactions.length === 0) return 0;

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    if (totalIncome === 0) return 0;

    const utilization = (totalExpenses / totalIncome) * 100;
    return Math.max(0, 100 - utilization); // Higher score for lower utilization
  }

  private static calculateCreditHistory(transactions: Transaction[]) {
    if (transactions.length === 0) return 0;

    const oldestTransaction = new Date(Math.min(...transactions.map(t => new Date(t.createdAt).getTime())));
    const monthsOfHistory = (new Date().getTime() - oldestTransaction.getTime()) / (30 * 24 * 60 * 60 * 1000);

    return Math.min(100, monthsOfHistory * 10); // 10 points per month, max 100
  }

  private static calculateCreditTypes(transactions: Transaction[]) {
    if (transactions.length === 0) return 0;

    const uniqueCategories = new Set(transactions.map(t => t.categoryId)).size;
    return Math.min(100, uniqueCategories * 20); // 20 points per unique category, max 100
  }

  private static calculateRecentInquiries(transactions: Transaction[]) {
    if (transactions.length === 0) return 0;

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const recentTransactions = transactions.filter(t => 
      new Date(t.createdAt) >= lastMonth
    ).length;

    return Math.max(0, 100 - (recentTransactions * 10)); // Deduct 10 points per recent transaction
  }

  // private static getFactors(transactions: Transaction[]) {
  //   return {
  //     paymentHistory: this.calculatePaymentHistory(transactions),
  //     creditUtilization: this.calculateCreditUtilization(transactions),
  //     creditHistory: this.calculateCreditHistory(transactions),
  //     creditTypes: this.calculateCreditTypes(transactions),
  //     recentInquiries: this.calculateRecentInquiries(transactions),
  //   };
  // }

  static async getHistory(params: { userId: string } & PaginationParams) {
    const { userId, page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const { count, rows } = await CreditScore.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      scores: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  }

  static async getLatest(userId: string) {
    return CreditScore.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  static async getFactors(userId: string) {
    const latestScore = await this.getLatest(userId);
    if (!latestScore) {
      throw new CustomError('No credit score found', 404, 'CREDIT_SCORE_NOT_FOUND');
    }
    return latestScore.factors;
  }

  static async getAllScores(params: PaginationParams) {
    const { page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const { count, rows } = await CreditScore.findAndCountAll({
      limit,
      offset,
      include: [{ model: User, attributes: ['id', 'email', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
    });

    return {
      scores: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  }

  static async getUserScores(params: { userId: string } & PaginationParams) {
    const { userId, page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const { count, rows } = await CreditScore.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      scores: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  }
} 