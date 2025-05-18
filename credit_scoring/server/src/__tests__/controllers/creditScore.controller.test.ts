import request from 'supertest';
import app from '../../app';
import { Transaction, Category, CreditScore } from '../../models';
import { createTestUser, loginTestUser, getAuthHeader } from '../helpers/auth.helper';

describe('Credit Score Controller', () => {
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

  describe('POST /api/credit-scores/calculate', () => {
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

    it('should calculate credit score', async () => {
      const response = await request(app)
        .post('/api/credit-scores/calculate')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.creditScore).toHaveProperty('score');
      expect(response.body.data.creditScore).toHaveProperty('factors');
    });

    it('should not calculate score without authentication', async () => {
      const response = await request(app)
        .post('/api/credit-scores/calculate');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/credit-scores/history', () => {
    beforeEach(async () => {
      // Create test credit scores
      await CreditScore.create({
        userId,
        score: 750,
        factors: {
          paymentHistory: 100,
          creditUtilization: 100,
          creditHistory: 100,
          creditTypes: 100,
          recentInquiries: 100,
        },
      });

      await CreditScore.create({
        userId,
        score: 800,
        factors: {
          paymentHistory: 100,
          creditUtilization: 100,
          creditHistory: 100,
          creditTypes: 100,
          recentInquiries: 100,
        },
      });
    });

    it('should get credit score history', async () => {
      const response = await request(app)
        .get('/api/credit-scores/history')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.scores).toHaveLength(2);
      expect(response.body.data.pagination).toBeDefined();
    });
  });

  describe('GET /api/credit-scores/latest', () => {
    beforeEach(async () => {
      // Create test credit score
      await CreditScore.create({
        userId,
        score: 750,
        factors: {
          paymentHistory: 100,
          creditUtilization: 100,
          creditHistory: 100,
          creditTypes: 100,
          recentInquiries: 100,
        },
      });
    });

    it('should get latest credit score', async () => {
      const response = await request(app)
        .get('/api/credit-scores/latest')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.creditScore.score).toBe(750);
    });

    it('should return 404 if no credit score exists', async () => {
      // Delete all credit scores
      await CreditScore.destroy({ where: { userId } });

      const response = await request(app)
        .get('/api/credit-scores/latest')
        .set(getAuthHeader(token));

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
      expect(response.body.code).toBe('CREDIT_SCORE_NOT_FOUND');
    });
  });

  describe('GET /api/credit-scores/factors', () => {
    beforeEach(async () => {
      // Create test credit score
      await CreditScore.create({
        userId,
        score: 750,
        factors: {
          paymentHistory: 100,
          creditUtilization: 100,
          creditHistory: 100,
          creditTypes: 100,
          recentInquiries: 100,
        },
      });
    });

    it('should get credit score factors', async () => {
      const response = await request(app)
        .get('/api/credit-scores/factors')
        .set(getAuthHeader(token));

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.factors).toHaveProperty('paymentHistory');
      expect(response.body.data.factors).toHaveProperty('creditUtilization');
    });
  });
}); 