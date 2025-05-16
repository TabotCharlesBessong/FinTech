import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export interface CreditScoreAttributes {
  id: string;
  userId: string;
  score: number;
  factors: {
    [key: string]: number;
  };
  calculationDate: Date;
  validUntil: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class CreditScore extends Model<CreditScoreAttributes> implements CreditScoreAttributes {
  public id!: string;
  public userId!: string;
  public score!: number;
  public factors!: { [key: string]: number };
  public calculationDate!: Date;
  public validUntil!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CreditScore.init(
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 300,
        max: 850
      }
    },
    factors: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    calculationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    validUntil: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'CreditScore',
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['calculationDate']
      }
    ]
  }
);

export default CreditScore; 