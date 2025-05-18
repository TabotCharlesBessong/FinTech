import request from 'supertest';
import app from '../../app';
import { User } from '../../models';
import bcrypt from 'bcryptjs';

export const createTestUser = async (role: 'user' | 'admin' = 'user') => {
  const userData = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role,
  };

  const user = await User.create({
    ...userData,
    password: await bcrypt.hash(userData.password, 10),
  });

  return user;
};

export const loginTestUser = async (email: string = 'test@example.com', password: string = 'password123') => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email, password });

  return response.body.data.token;
};

export const getAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
}); 