import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import config from './config.js';
import initSocket from './sockets.js';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import usersRouter from './routes/users.routes.js';
import cartsRouter from './routes/carts.routes.js';
import cookieRouter from './routes/cookies.routes.js';
import sessionRouter from './routes/sessions.routes.js';

const app = express();

const expressInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Activamos el uso del cookieParser para leer cookies correctamente
    app.use(cookieParser(config.SECRET));
    // Activamos el uso del módulo de sesiones para identificar usuarios
    app.use(session({
        secret: config.SECRET,
        resave: true,
        saveUninitialized: true
    }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/carts', cartsRouter);
    // Agregamos estos prefijos solamente como PRUEBA
    // para comprender conceptos de cookies y sesiones
    // luego se usarán desde otras rutas
    app.use('/api/cookies', cookieRouter);
    app.use('/api/sessions', sessionRouter);
    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`App activa en puerto ${config.PORT} conectada a bbdd ${config.SERVER}`);
});
