import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  static async getAll(req: Request, res: Response) {
    const tasks = await TaskService.getAll();
    res.json(tasks);
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const task = await TaskService.getById(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task no encontrada' });
    }
  }

  static async create(req: Request, res: Response) {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ message: 'El campo text es obligatorio y no puede estar vacío.' });
    }
    const newTask = await TaskService.create(text);
    res.status(201).json(newTask);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ message: 'El campo text es obligatorio y no puede estar vacío.' });
    }
    const task = await TaskService.getById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task no encontrada' });
    }
    const updatedTask = await TaskService.update(id, text);
    res.json(updatedTask);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await TaskService.delete(id);
    if (deleted) {
      res.json({ message: 'Task eliminada' });
    } else {
      res.status(404).json({ message: 'Task no encontrada' });
    }
  }
} 