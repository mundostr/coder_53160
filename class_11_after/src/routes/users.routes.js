import { Router } from 'express';

import config from '../config.js';
import { users } from '../data.js';
import { uploader } from '../uploader.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({ origin: config.SERVER, payload: users });
});

router.post('/', uploader.single('thumbnail'), (req, res) => {
    // Obtenemos la instancia global del objeto socketServer
    const socketServer = req.app.get('socketServer');

    console.log(req.file);
    console.log(req.body);
    users.push(req.body);
    res.status(200).send({ origin: config.SERVER, payload: req.body });

    // Emitimos una notificación en el tópico newUser para avisar que
    // se acaba de cargar un nuevo usuario
    socketServer.emit('newUser', req.body);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: config.SERVER, payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {
        const { email = '', password = '' } = req.body;
        
        res.status(200).send({ origin: config.SERVER, payload: `Quiere modificar el id ${id} con el contenido del body`, body: { email, password } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: config.SERVER, payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {        
        res.status(200).send({ origin: config.SERVER, payload: `Quiere borrar el id ${id}` });
    }
});

export default router;
