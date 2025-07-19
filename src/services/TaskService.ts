import AppDataSource from '../database/database';
import { Task } from '../models/Task';

export class TaskService {
  static getRepository() {
    return AppDataSource.getRepository(Task);
  }

  static async getAll() {
    return await this.getRepository().find();
  }

  static async getById(id: number) {
    return await this.getRepository().findOneBy({ id });
  }

  static async create(text: string) {
    const task = this.getRepository().create({ text });
    return await this.getRepository().save(task);
  }

  static async update(id: number, text: string) {
    const repo = this.getRepository();
    const task = await repo.findOneBy({ id });
    if (!task) return null;
    task.text = text;
    return await repo.save(task);
  }

  static async delete(id: number) {
    const repo = this.getRepository();
    const result = await repo.delete(id);
    return result.affected !== 0;
  }
} 