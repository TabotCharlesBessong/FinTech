import { sequelize } from './config';
import { seedUsers } from './users.seeder';
import { seedCategories } from './categories.seeder';
import { seedTransactions } from './transactions.seeder';
import { seedCreditScores } from './credit-scores.seeder';

async function seed() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Run seeders
    await seedUsers();
    console.log('Users seeded');

    await seedCategories();
    console.log('Categories seeded');

    await seedTransactions();
    console.log('Transactions seeded');

    await seedCreditScores();
    console.log('Credit scores seeded');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 