import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Category from './Category';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface TransactionAttributes {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: TransactionType;
  description: string;
  transactionDate: Date;
  status: TransactionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

class Transaction extends Model<TransactionAttributes> implements TransactionAttributes {
  public id!: string;
  public userId!: string;
  public categoryId!: string;
  public amount!: number;
  public type!: TransactionType;
  public description!: string;
  public transactionDate!: Date;
  public status!: TransactionStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TransactionType)),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TransactionStatus)),
      defaultValue: TransactionStatus.PENDING
    }
  },
  {
    sequelize,
    modelName: 'Transaction',
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['categoryId']
      },
      {
        fields: ['transactionDate']
      }
    ]
  }
);

export default Transaction; 