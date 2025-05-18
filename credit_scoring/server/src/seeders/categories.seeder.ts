import { Category } from '../models';

export async function seedCategories() {
  const categories = [
    {
      name: 'Salary',
      type: 'income',
      description: 'Monthly salary income',
      icon: 'money-bill',
    },
    {
      name: 'Freelance',
      type: 'income',
      description: 'Freelance work income',
      icon: 'laptop-code',
    },
    {
      name: 'Investments',
      type: 'income',
      description: 'Investment returns',
      icon: 'chart-line',
    },
    {
      name: 'Housing',
      type: 'expense',
      description: 'Rent, mortgage, utilities',
      icon: 'home',
    },
    {
      name: 'Transportation',
      type: 'expense',
      description: 'Car payments, fuel, public transport',
      icon: 'car',
    },
    {
      name: 'Food',
      type: 'expense',
      description: 'Groceries and dining out',
      icon: 'utensils',
    },
    {
      name: 'Entertainment',
      type: 'expense',
      description: 'Movies, games, hobbies',
      icon: 'film',
    },
    {
      name: 'Healthcare',
      type: 'expense',
      description: 'Medical expenses, insurance',
      icon: 'heartbeat',
    },
    {
      name: 'Education',
      type: 'expense',
      description: 'Tuition, books, courses',
      icon: 'graduation-cap',
    },
    {
      name: 'Shopping',
      type: 'expense',
      description: 'Clothing, electronics, etc.',
      icon: 'shopping-cart',
    },
  ];

  await Category.bulkCreate(categories);
} 