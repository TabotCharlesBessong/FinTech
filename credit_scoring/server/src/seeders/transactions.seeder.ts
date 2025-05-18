import { Transaction, User, Category, TransactionType, TransactionStatus } from '../models';
import { faker } from '@faker-js/faker';

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
        amount: faker.number.int({ min: 1000, max: 5000 }),
        type: TransactionType.INCOME,
        description: `Monthly ${category.name.toLowerCase()} income`,
        transactionDate: faker.date.recent({ days: 30 }),
        status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
      });
    }

    // Generate expense transactions
    for (let i = 0; i < 15; i++) {
      const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
      transactions.push({
        userId: user.id,
        categoryId: category.id,
        amount: faker.number.int({ min: 10, max: 500 }),
        type: TransactionType.EXPENSE,
        description: `${category.name.toLowerCase()} expense`,
        transactionDate: faker.date.recent({ days: 30 }),
        status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
      });
    }
  }

  await Transaction.bulkCreate(transactions as any);
} 