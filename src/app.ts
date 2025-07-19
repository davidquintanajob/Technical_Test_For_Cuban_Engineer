import { connectDatabase } from './database/database';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Task } from './models/Task';
import taskRoutes from './routs/taskRoutes';

dotenv.config();

const app = express();

// Middleware para logging de cada consulta
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use(cors({ origin: process.env.CORS_OPTIONS || '*' }));

const PORT = process.env.PPORT || 4000;

connectDatabase();

app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
