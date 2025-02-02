import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/database'; 
import productRoutes from './routes/product-routes'; // Tus rutas
import cors from 'cors';

// Crear una instancia de la aplicación
const app = express();

// Middlewares
const corsOptions = {
  origin: 'http://localhost:5173/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permitir los métodos mencionados
  credentials: true, // Permitir el uso de cookies en CORS
}
app.use(cors()); // Para permitir solicitudes desde cualquier origen
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios

app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.use('/api', productRoutes); // Ruta base para los endpoints

// Puerto del servidor (leer desde el archivo .env o usar 3001 por defecto)
const PORT = process.env.PORT || 3001;

// Inicializar el servidor
const startServer = async () => {
  try {
    // Inicializar la conexión a la base de datos
    await AppDataSource.initialize();
    console.log('Conexión exitosa a la base de datos');

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();