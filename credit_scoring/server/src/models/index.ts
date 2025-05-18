import User, { UserAttributes, UserRole } from './User';
import Transaction, { TransactionAttributes, TransactionType, TransactionStatus } from './Transaction';
import Category, { CategoryAttributes } from './Category';
import CreditScore, { CreditScoreAttributes } from './CreditScore';

// User Associations
User.hasMany(Transaction, {
  foreignKey: 'userId',
  as: 'transactions'
});
User.hasMany(CreditScore, {
  foreignKey: 'userId',
  as: 'creditScores'
});

// Transaction Associations
Transaction.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});
Transaction.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

// Category Associations
Category.hasMany(Transaction, {
  foreignKey: 'categoryId',
  as: 'transactions'
});

// CreditScore Associations
CreditScore.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export {
  User,
  UserAttributes,
  UserRole,
  Transaction,
  TransactionAttributes,
  TransactionType,
  TransactionStatus,
  Category,
  CategoryAttributes,
  CreditScore,
  CreditScoreAttributes
};