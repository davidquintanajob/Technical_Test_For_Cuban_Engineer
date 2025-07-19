import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Cambia a false en producción
  logging: false,
  entities: [__dirname + '/../models/**/*.{ts,js}'],
  migrations: [],
  subscribers: [],
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

export default AppDataSource; 