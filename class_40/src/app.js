import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb://127.0.0.1:27017/coder_53160');

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

// Generamos objeto base config Swagger y levantamos
// endpoint para servir la documentación
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación sistema AdoptMe',
            description: 'Esta documentación cubre toda la API habilitada para AdoptMe',
        },
    },
    apis: ['./src/docs/**/*.yaml'], // todos los archivos de configuración de rutas estarán aquí
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
