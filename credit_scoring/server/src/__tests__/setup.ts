import { config } from 'dotenv';
import sequelize from 'src/config/database';

// Load test environment variables
config({ path: '.env.test' });

// Global setup before all tests
beforeAll(async () => {
  // Sync database
  await sequelize.sync({ force: true });
});

// Global teardown after all tests
afterAll(async () => {
  // Close database connection
  await sequelize.close();
});

// Reset database after each test
afterEach(async () => {
  await sequelize.truncate({ cascade: true });
}); 