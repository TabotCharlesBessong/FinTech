import { CreditScore, User } from '../models';
import { faker } from '@faker-js/faker';

export async function seedCreditScores() {
  const users = await User.findAll();
  const creditScores = [];

  for (const user of users) {
    // Generate 3 months of credit score history
    for (let i = 0; i < 3; i++) {
      const calculationDate = new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000); // One month apart
      creditScores.push({
        userId: user.id,
        score: faker.number.int({ min: 300, max: 850 }),
        factors: {
          paymentHistory: faker.number.int({ min: 0, max: 100 }),
          creditUtilization: faker.number.int({ min: 0, max: 100 }),
          creditHistory: faker.number.int({ min: 0, max: 100 }),
          creditMix: faker.number.int({ min: 0, max: 100 }),
          newCredit: faker.number.int({ min: 0, max: 100 })
        },
        calculationDate,
        validUntil: new Date(calculationDate.getTime() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
      });
    }
  }

  await CreditScore.bulkCreate(creditScores as any);
} 