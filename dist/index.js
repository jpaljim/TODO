"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const config_1 = require("./database/config");
// Crear el servidor de express
const app = express_1.default();
// Configurar CORS
app.use(cors_1.default());
// Lectura y parseo del body
app.use(express_1.default.json());
// Conexión a la base de datos
config_1.dbConnection();
// Rutas
app.use('/api/tasks', tasks_1.default);
app.listen(process.env.PORT, () => {
    console.log('Server running on port: ' + process.env.PORT);
});
