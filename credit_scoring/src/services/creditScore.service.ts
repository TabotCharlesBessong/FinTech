import { CreditScore } from '../models/CreditScore';
import { Transaction } from '../models/Transaction';

export class CreditScoreService {
  static async calculateForUser(userId: string) {
    // Fetch transactions
    const transactions = await Transaction.findAll({ where: { userId } });
    // Example calculation (replace with real logic)
    let score = 700;
    let income = 0;
    let expenses = 0;
    transactions.forEach(tx => {
      if (tx.type === 'income') income += Number(tx.amount);
      if (tx.type === 'expense') expenses += Number(tx.amount);
    });
    if (income > 0) score += 10;
    if (expenses > income) score -= 20;
    // Save score
    const creditScore = await CreditScore.create({
      userId,
      score,
      factors: { income, expenses },
      calculationDate: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
    return creditScore;
  }

  static async getLatestByUser(userId: string) {
    return CreditScore.findOne({
      where: { userId },
      order: [['calculationDate', 'DESC']]
    });
  }

  static async getHistoryByUser(userId: string) {
    return CreditScore.findAll({
      where: { userId },
      order: [['calculationDate', 'DESC']]
    });
  }
} 