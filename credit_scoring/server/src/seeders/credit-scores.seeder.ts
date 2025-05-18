import { CreditScore, User } from '../models';

export async function seedCreditScores() {
  const users = await User.findAll();
  const creditScores = [];

  for (const user of users) {
    // Generate 3 months of credit score history
    for (let i = 0; i < 3; i++) {
      const baseScore = Math.floor(Math.random() * 200) + 300; // Random score between 300-500
      creditScores.push({
        userId: user.id,
        score: baseScore,
        factors: {
          paymentHistory: Math.floor(Math.random() * 100),
          creditUtilization: Math.floor(Math.random() * 100),
          creditAge: Math.floor(Math.random() * 100),
          creditMix: Math.floor(Math.random() * 100),
          newCredit: Math.floor(Math.random() * 100)
        },
        date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000) // One month apart
      });
    }
  }

  await CreditScore.bulkCreate(creditScores);
} 