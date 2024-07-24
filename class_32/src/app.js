import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
// import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors';

import config from './config.js';
import initSocket from './services/sockets.js';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import usersRouter from './routes/users.routes.js';
import cartsRouter from './routes/carts.routes.js';
import cookieRouter from './routes/cookies.routes.js';
import authRouter from './routes/auth.routes.js';
import TestRouter from './routes/test.routes.js';
import MongoSingleton from './services/mongo.singleton.js';
import errorsHandler from './services/errors.handler.js';

const app = express();

const expressInstance = app.listen(config.PORT, async() => {
    MongoSingleton.getInstance();

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(config.SECRET));
    
    const fileStorage = FileStore(session);
    app.use(session({
        store: new fileStorage({ path: './sessions', ttl: 100, retries: 0 }),
        // store: MongoStore.create({ mongoUrl: config.MONGODB_URI, ttl: 600 }),
        secret: config.SECRET,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/cookies', cookieRouter);
    app.use('/api/auth', authRouter);
    // app.use('/api/test', new TestRouter().getRouter()); // router custom
    app.use('/static', express.static(`${config.DIRNAME}/public`));
    app.use(errorsHandler);

    console.log(`App activa en puerto ${config.PORT} conectada a bbdd ${config.SERVER}`);
});
