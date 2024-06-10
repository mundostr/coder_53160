import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
// import MongoStore from 'connect-mongo';
import passport from 'passport';

import config from './config.js';
import initSocket from './sockets.js';
import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';
import usersRouter from './routes/users.routes.js';
import cartsRouter from './routes/carts.routes.js';
import cookieRouter from './routes/cookies.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();

const expressInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(config.SECRET));
    
     // ttl = time to live (tiempo de vida de la sesión en segundos)
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
    // Cambiamos el nombre del paquete de rutas a authRouter
    // solo para ordenarnos, ya que ahora puede contener tanto sesiones como tokens
    app.use('/api/auth', authRouter);
    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`App activa en puerto ${config.PORT} conectada a bbdd ${config.SERVER}`);
});
