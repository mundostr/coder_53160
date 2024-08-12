import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import config from './config.js';
import initSocket from './sockets.js';
import viewsRouter from './routes/views.routes.js';
import usersRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();

const expressInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(config.SECRET));
    
    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/auth', authRouter);
    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`App activa en puerto ${config.PORT} conectada a bbdd ${config.SERVER}`);
});
