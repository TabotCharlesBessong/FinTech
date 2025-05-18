import { Category } from '../models';
import { faker } from '@faker-js/faker';

export async function seedCategories() {
  const categories = [
    {
      name: 'Salary',
      type: 'income' as const,
      description: 'Monthly salary income',
      icon: 'money-bill',
    },
    {
      name: 'Freelance',
      type: 'income' as const,
      description: 'Freelance work income',
      icon: 'laptop-code',
    },
    {
      name: 'Investments',
      type: 'income' as const,
      description: 'Investment returns',
      icon: 'chart-line',
    },
    {
      name: 'Housing',
      type: 'expense' as const,
      description: 'Rent, mortgage, utilities',
      icon: 'home',
    },
    {
      name: 'Transportation',
      type: 'expense' as const,
      description: 'Car payments, fuel, public transport',
      icon: 'car',
    },
    {
      name: 'Food',
      type: 'expense' as const,
      description: 'Groceries and dining out',
      icon: 'utensils',
    },
    {
      name: 'Entertainment',
      type: 'expense' as const,
      description: 'Movies, games, hobbies',
      icon: 'film',
    },
    {
      name: 'Healthcare',
      type: 'expense' as const,
      description: 'Medical expenses, insurance',
      icon: 'heartbeat',
    },
    {
      name: 'Education',
      type: 'expense' as const,
      description: 'Tuition, books, courses',
      icon: 'graduation-cap',
    },
    {
      name: 'Shopping',
      type: 'expense' as const,
      description: 'Clothing, electronics, etc.',
      icon: 'shopping-cart',
    },
  ];

  // Generate 5 random categories
  for (let i = 0; i < 5; i++) {
    const type = faker.helpers.arrayElement(['income', 'expense'] as const);
    categories.push({
      name: faker.commerce.department(),
      type,
      description: faker.commerce.productDescription(),
      icon: faker.helpers.arrayElement(['star', 'heart', 'circle', 'square', 'triangle']),
    });
  }

  await Category.bulkCreate(categories as any);
} 