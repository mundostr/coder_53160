import { Router } from 'express';

import config from '../config.js';
import { products } from '../data.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({ origin: config.SERVER, payload: products });
});

router.post('/', (req, res) => {
    // Obtenemos la instancia global del objeto socketServer
    const socketServer = req.app.get('socketServer');

    console.log(req.body);
    products.push(req.body);
    res.status(200).send({ origin: config.SERVER, payload: req.body });

    // Emitimos una notificación en el tópico newUser para avisar que
    // se acaba de cargar un nuevo usuario
    socketServer.emit('newProduct', req.body);
});

export default router;
