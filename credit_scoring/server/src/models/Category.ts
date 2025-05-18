import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface CategoryAttributes {
  id: string;
  name: string;
  type: 'income' | 'expense';
  description: string;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: string;
  public name!: string;
  public type!: 'income' | 'expense';
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
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default-icon',
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  }
);

export default Category; 