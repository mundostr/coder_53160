import express from 'express';
import handlebars from 'express-handlebars';
import config from './config.js';
import usersRouter from './routes/users.routes.js';
import viewsRouter from './routes/views.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Para activar el uso del motor de plantillas, solo necesitamos estas 3 líneas
 * Si aparece algún error al momento de ejecutar, casi siempre tiene que ver
 * con las rutas de las plantillas, revisar el valor de config.DIRNAME y asegurarse
 * que la ruta a views sea la correcta.
 */
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

// Acceso a vistas (plantillas Handlebars)
app.use('/', viewsRouter);
// Acceso a endponts de la API
app.use('/api/users', usersRouter);
// Acceso a contenidos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, () => {
    console.log(`App activa en puerto ${config.PORT}`);
});
