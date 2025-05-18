import { User } from '../models';
import bcrypt from 'bcryptjs';

export async function seedUsers() {
  const users = [
    {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
    {
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      firstName: 'Regular',
      lastName: 'User',
      role: 'user',
    },
    {
      email: 'john@example.com',
      password: await bcrypt.hash('john123', 10),
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
    },
    {
      email: 'jane@example.com',
      password: await bcrypt.hash('jane123', 10),
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'user',
    },
  ];

  await User.bulkCreate(users);
} 