import { User, UserRole } from '../models';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

export async function seedUsers() {
  const users = [
    {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Admin',
      lastName: 'User',
      phoneNumber: faker.phone.number(),
      role: UserRole.ADMIN,
      isVerified: true,
    },
    {
      email: 'user@example.com',
      password: await bcrypt.hash('user123', 10),
      firstName: 'Regular',
      lastName: 'User',
      phoneNumber: faker.phone.number(),
      role: UserRole.ADMIN,
      isVerified: true,
    },
  ];

  // Generate 10 random users
  for (let i = 0; i < 10; i++) {
    users.push({
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 10),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      role: UserRole.USER,
      isVerified: faker.datatype.boolean(),
    });
  }

  await User.bulkCreate(users as any);
} 