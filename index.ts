require('dotenv').config();

import express from 'express';
import cors from 'cors';

import taskRouter from './routes/tasks';
import { dbConnection } from './database/config';

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Conexión a la base de datos
dbConnection();

// Rutas
app.use( '/api/tasks', taskRouter );


app.listen( process.env.PORT, () => {
    console.log('Server running on port: ' + process.env.PORT );
});

