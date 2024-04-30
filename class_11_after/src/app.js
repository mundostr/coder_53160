import express from 'express';
import handlebars from 'express-handlebars';

import config from './config.js';
import initSocket from './sockets.js';
import viewsRouter from './routes/views.routes.js';
import usersRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();
const expressInstance = app.listen(config.PORT, () => {
    console.log(`App activa en puerto ${config.PORT}`);
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
