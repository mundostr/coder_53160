import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config.js';
import initSocket from './services/sockets.js';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import MongoSingleton from './services/mongo.singleton.js';
// import errorsHandler from './services/errors.handler.js';

const app = express();

const expressInstance = app.listen(config.PORT, async() => {
    MongoSingleton.getInstance();

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(config.SECRET));
    
    // app.use(passport.initialize());
    // app.use(passport.session());

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/products', productsRouter);
    // app.use('/static', express.static(`${config.DIRNAME}/public`));
    // app.use(errorsHandler);

    console.log(`App activa en puerto ${config.PORT} conectada a bbdd ${config.SERVER}`);
});
