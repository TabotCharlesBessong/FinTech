import jwt from 'jsonwebtoken';
import { User } from '../models';
import { CustomError } from '../utils/customError';
import bcrypt from 'bcryptjs';

export class UserService {
  static async create(data: any) {
    return User.create(data);
  }

  static async getById(id: string) {
    return User.findByPk(id);
  }

  static async getByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  static async getAll() {
    return User.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  static async update(id: string, data: any) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
    }

    // If password is being updated, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return user.update(data);
  }

  static async delete(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError('User not found', 404, 'USER_NOT_FOUND');
    }
    return user.destroy();
  }

  static async register(data: any) {
    const user = await User.create(data);
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    const valid = await user.comparePassword(password);
    if (!valid) throw new Error('Invalid credentials');
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    
    return { user, token };
  }
} 