import express from 'express';
import config from './config.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

/* const indicate = (req, res, next) => {
    console.log('Se procesa');
    
    next();
} */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(indicate);
app.use('/api/users', usersRoutes);
app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, () => {
    console.log(`App activa en puerto ${config.PORT}`);
});
