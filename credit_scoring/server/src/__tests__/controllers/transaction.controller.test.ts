import request from 'supertest';
import app from '../../app';
import { Transaction, Category } from '../../models';
import { createTestUser, loginTestUser, getAuthHeader } from '../helpers/auth.helper';

describe('Transaction Controller', () => {
  let token: string;
  let userId: string;
  let categoryId: string;

  beforeEach(async () => {
    // Create test user and get token
    const user = await createTestUser();
    userId = user.id;
    token = await loginTestUser();

    // Create test category
    const category = await Category.create({
      name: 'Test Category',
      type: 'expense',
      description: 'Test category description',
    });
    categoryId = category.id;
  });

  describe('POST /api/transactions', () => {
    it('should create a new transaction', async () => {
      const transactionData = {
        amount: 100.50,
        type: 'expense',
        categoryId,
        description: 'Test transaction',
        date: new Date().toISOString(),
      };

      const response = await request(app)
        .post('/api/transactions')
        .set(getAuthHeader(token))
        .send(transactionData);

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.transaction).toHaveProperty('id');
      expect(response.body.data.transaction.amount).toBe(transactionData.amount);
    });

    it('should not create transaction without authentication', async () => {
      const response = await request(app)
        .post('/api/transactions')
        .send({
          amount: 100.50,
          type: 'expense',
          categoryId,
          description: 'Test transaction',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/transactions', () => {
    beforeEach(async () => {
      // Create test transactions
      await Transaction.create({
        amount: 100,
        type: 'expense',
        categoryId,
        userId,
        description: 'Test transaction 1',
        date: new Date(),
      });

      await Transaction.create({
        amount: 200,
        type: 'income',
        categoryId,
        userId,
        description: 'Test transaction 2',
        date: new Date(),
      });
    });

    it('should get all transactions for user', async () => {
      const response = await request(app)
        .get('/api/transactions')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.transactions).toHaveLength(2);
    });

    it('should filter transactions by type', async () => {
      const response = await request(app)
        .get('/api/transactions?type=income')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.data.transactions).toHaveLength(1);
      expect(response.body.data.transactions[0].type).toBe('income');
    });
  });

  describe('GET /api/transactions/stats', () => {
    beforeEach(async () => {
      // Create test transactions
      await Transaction.create({
        amount: 100,
        type: 'expense',
        categoryId,
        userId,
        description: 'Test expense',
        date: new Date(),
      });

      await Transaction.create({
        amount: 300,
        type: 'income',
        categoryId,
        userId,
        description: 'Test income',
        date: new Date(),
      });
    });

    it('should get transaction statistics', async () => {
      const response = await request(app)
        .get('/api/transactions/stats')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.stats).toHaveProperty('totalIncome');
      expect(response.body.data.stats).toHaveProperty('totalExpense');
      expect(response.body.data.stats).toHaveProperty('netAmount');
      expect(response.body.data.stats.totalIncome).toBe(300);
      expect(response.body.data.stats.totalExpense).toBe(100);
      expect(response.body.data.stats.netAmount).toBe(200);
    });
  });
}); 