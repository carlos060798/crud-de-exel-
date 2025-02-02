import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../entities/product'

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: (process.env.DB_HOST ?? '').split('\\')[0], // Host sin la instancia
  port: parseInt(process.env.DB_PORT || '1433', 10), // Default port 1433 if DB_PORT is undefined
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Cambiar a true si necesitas encriptar la conexión
    enableArithAbort: true, // Importante para evitar errores en SQL Server
  },
  extra: {
    instanceName: (process.env.DB_HOST ?? '').split('\\')[1], // Nombre de la instancia
  },
  synchronize: true, // Solo para desarrollo; deshabilitar en producción
  logging: true, // Cambiar a false si no necesitas logs
  entities: [Product],
});