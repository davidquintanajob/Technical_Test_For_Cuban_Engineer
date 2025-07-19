import { connectDatabase } from './database/database';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Task } from './models/Task';
import taskRoutes from './routs/taskRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

// Middleware for logging each request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '1.0.0',
      description: 'API documentation for task management',
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            text: { type: 'string', example: 'My task' },
          },
        },
      },
    },
  },
  apis: ['./src/routs/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors({ origin: process.env.CORS_OPTIONS || '*' }));

const PORT = process.env.PPORT || 4000;

connectDatabase();

app.use('/api', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
