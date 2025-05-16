import { User, UserRole } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  static async register(data: any) {
    const user = await User.create(data);
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    const valid = await user.comparePassword(password);
    if (!valid) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
    return { user, token };
  }

  static async getById(id: string) {
    return User.findByPk(id);
  }

  static async getAll() {
    return User.findAll();
  }
} 