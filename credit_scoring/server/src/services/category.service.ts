import { Category } from "src/models";

export class CategoryService {
  static async create(data: any) {
    return Category.create(data);
  }

  static async getById(id: string) {
    return Category.findByPk(id);
  }

  static async getAll() {
    return Category.findAll();
  }

  static async update(id: string, data: any) {
    const cat = await Category.findByPk(id);
    if (!cat) throw new Error('Category not found');
    return cat.update(data);
  }

  static async delete(id: string) {
    const cat = await Category.findByPk(id);
    if (!cat) throw new Error('Category not found');
    return cat.destroy();
  }
} 