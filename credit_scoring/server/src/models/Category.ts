import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { TransactionType } from './Transaction';

export interface CategoryAttributes {
  id: string;
  name: string;
  type: TransactionType;
  description: string;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: string;
  public name!: string;
  public type!: TransactionType;
  public description!: string;
  public icon!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TransactionType)),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Category',
    indexes: [
      {
        fields: ['name']
      },
      {
        fields: ['type']
      }
    ]
  }
);

export default Category; 