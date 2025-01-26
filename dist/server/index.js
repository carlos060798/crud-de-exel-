"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware para JSON
app.use(express_1.default.json());
// Rutas
app.use('/api', product_routes_1.default);
// Archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
// Manejar rutas no definidas en la API
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'Endpoint no encontrado' });
});
// Redirigir todo lo demás al cliente React
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
// Inicializar el servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL no está definida');
        }
        yield database_1.AppDataSource.initialize();
        console.log('Conexión exitosa a la base de datos');
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
});
startServer();
