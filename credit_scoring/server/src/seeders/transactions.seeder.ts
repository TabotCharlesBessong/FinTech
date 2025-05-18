import { Transaction, User, Category } from '../models';
import { Op } from 'sequelize';

export async function seedTransactions() {
  // Get users and categories
  const users = await User.findAll();
  const categories = await Category.findAll();

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  const transactions = [];

  // Generate transactions for each user
  for (const user of users) {
    // Generate income transactions
    for (let i = 0; i < 5; i++) {
      const category = incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
      transactions.push({
        userId: user.id,
        categoryId: category.id,
        amount: Math.floor(Math.random() * 5000) + 1000,
        type: 'income',
        description: `Monthly ${category.name.toLowerCase()} income`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      });
    }

    // Generate expense transactions
    for (let i = 0; i < 15; i++) {
      const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
      transactions.push({
        userId: user.id,
        categoryId: category.id,
        amount: Math.floor(Math.random() * 500) + 10,
        type: 'expense',
        description: `${category.name.toLowerCase()} expense`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      });
    }
  }

  await Transaction.bulkCreate(transactions);
} 