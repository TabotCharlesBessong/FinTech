import User from './User';
import Transaction from './Transaction';
import Category from './Category';
import CreditScore from './CreditScore';

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
  Transaction,
  Category,
  CreditScore
};