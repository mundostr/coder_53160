/**
 * PRACTICA DE INTEGRACION 1
 * 
 * Comenzamos desde cero y tratamos de integrar:
 *  Express
 *  Handlebars
 *  Routes por separado
 *  Archivo de config por separado
 *  Mongoose con modelos
 *  Servicio de archivos estáticos public
 *  Servidor socket.io
 *  Subida de archivos con Multer
 *  Clase para manejo de productos
 */

import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

import config from './config.js';
import initSocket from './sockets.js';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();

const expressInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/products', productsRouter);
    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`App activa en puerto ${config.PORT} conectada a bbdd ${config.SERVER}`);
});
