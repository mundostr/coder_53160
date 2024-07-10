import cors from 'cors';
import express from 'express';

import config from './config.js';
import businessesRouter from './routes/businesses.routes.js';
import ordersRouter from './routes/orders.routes.js';
import usersRouter from './routes/users.routes.js';
import MongoSingleton from './services/mongo.singleton.js';

try {
    const app = express();

    const httpServer = app.listen(config.PORT, () => {
        MongoSingleton.getInstance();
        console.log(`Backend: OK puerto ${config.PORT}`);
    })

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Al habilitar cors, podemos controlar tanto los orígenes
    // de solicitudes como los tipos aceptados
    app.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE' }));

    app.use('/api/businesses', businessesRouter);
    app.use('/api/orders', ordersRouter);
    app.use('/api/users', usersRouter);
} catch(err) {
    console.log(`Backend: error al inicializar (${err.message})`);
};
