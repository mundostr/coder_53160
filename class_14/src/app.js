/**
 * Clase 14:
 * 
 * Agregamos el módulo Mongoose para comenzar a utilizar
 * bases de datos MongoDB.
 */

import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

import config from './config.js';
import initSocket from './sockets.js';
import viewsRouter from './routes/views.routes.js';
import usersRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();
/**
 * Convertimos el callback de este método listen en asíncrono (async),
 * de esa forma podemos esperar (await) la conexión al motor MongoDB,
 * y recién ahí mostrar el mensaje por consola.
 * 
 * Por lo tanto, si vemos en consola el mensaje sin errores, sabremos
 * que ha pasado por el mongoose.connect() satisfactoriamente. Por supuesto
 * es un control básico, pero suficiente por el momento.
 */
const expressInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`App activa en puerto ${config.PORT} enlazada a bbdd`);
});
const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));
