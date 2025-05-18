import { Transaction, Category } from '../models';
import { CustomError } from '../utils/customError';
import { Op } from 'sequelize';

interface TransactionFilters {
  userId: string;
  page?: number;
  limit?: number;
  type?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}

export class TransactionService {
  static async create(data: any) {
    return Transaction.create(data);
  }

  static async getById(id: string) {
    return Transaction.findByPk(id, {
      include: [{ model: Category, as: 'category' }],
    });
  }

  static async getAll(filters: TransactionFilters) {
    const { userId, page = 1, limit = 10, type, categoryId, startDate, endDate } = filters;
    const offset = (page - 1) * limit;

    const where: any = { userId };
    if (type) where.type = type;
    if (categoryId) where.categoryId = categoryId;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    const { count, rows } = await Transaction.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: Category, as: 'category' }],
      order: [['date', 'DESC']],
    });

    return {
      transactions: rows,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  }

  static async update(id: string, data: any) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
    }
    return transaction.update(data);
  }

  static async delete(id: string) {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
    }
    return transaction.destroy();
  }

  static async getStats(filters: { userId: string; startDate?: string; endDate?: string }) {
    const { userId, startDate, endDate } = filters;
    const where: any = { userId };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    const transactions = await Transaction.findAll({
      where,
      include: [{ model: Category, as: 'category' }],
    });

    const stats = {
      totalIncome: 0,
      totalExpense: 0,
      netAmount: 0,
      byCategory: {} as Record<string, { income: number; expense: number }>,
    };

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount);
      const categoryName = transaction.category?.name || 'Uncategorized';

      if (!stats.byCategory[categoryName]) {
        stats.byCategory[categoryName] = { income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        stats.totalIncome += amount;
        stats.byCategory[categoryName].income += amount;
      } else {
        stats.totalExpense += amount;
        stats.byCategory[categoryName].expense += amount;
      }
    });

    stats.netAmount = stats.totalIncome - stats.totalExpense;
    return stats;
  }
}