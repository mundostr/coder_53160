import express from 'express';

import config from './config.js';
import baseRouter from './routes/base.routes.js';

const app = express();
const instance = app.listen(config.PORT, () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/base', baseRouter);

    // Habilito un listener por salidas inesperadas del proceso
    process.on('exit', code => {
        if (code === -4) {
            console.log('Proceso finalizado por argumentación inválida en una función');
        }
    });

    console.log(`App activa en puerto ${config.PORT} PID ${process.pid} conectada a bbdd ${config.MONGODB_URI}`);
});
