import { Router } from 'express';
import { data } from '../data.js';
import { uploader } from '../uploader.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({ origin: 'server1', payload: data });
});

router.post('/', uploader.single('thumbnail'), (req, res) => {
    // Esta es la forma de recuperar un objeto global (req.app.get);
    // Ver app.set en app.js
    const socketServer = req.app.get('socketServer');

    console.log(req.file);
    console.log(req.body);
    res.status(200).send({ origin: 'server1', payload: req.body });

    socketServer.emit('newUser', 'Se cargó nuevo usuario');
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {
        const { email = '', password = '' } = req.body;
        
        res.status(200).send({ origin: 'server1', payload: `Quiere modificar el id ${id} con el contenido del body`, body: { email, password } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {        
        res.status(200).send({ origin: 'server1', payload: `Quiere borrar el id ${id}` });
    }
});

export default router;
