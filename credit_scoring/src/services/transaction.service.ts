import { Transaction } from '../models/Transaction';
import { Category } from '../models/Category';

export class TransactionService {
  static async create(data: any) {
    return Transaction.create(data);
  }

  static async getById(id: string) {
    return Transaction.findByPk(id, { include: ['category', 'user'] });
  }

  static async getAllByUser(userId: string) {
    return Transaction.findAll({ where: { userId }, include: ['category'] });
  }

  static async update(id: string, data: any) {
    const tx = await Transaction.findByPk(id);
    if (!tx) throw new Error('Transaction not found');
    return tx.update(data);
  }

  static async delete(id: string) {
    const tx = await Transaction.findByPk(id);
    if (!tx) throw new Error('Transaction not found');
    return tx.destroy();
  }

  static async getAllByCategory(categoryId: string) {
    return Transaction.findAll({ where: { categoryId }, include: ['user'] });
  }
} 