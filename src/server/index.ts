import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { AppDataSource } from './config/database';
import productRoutes from './routes/product-routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api', productRoutes);

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../../client/build')));

// Manejar rutas no definidas en la API
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

// Redirigir todo lo demás al cliente React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// Inicializar el servidor
const startServer = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL no está definida');
    }

    await AppDataSource.initialize();
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
