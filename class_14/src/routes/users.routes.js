import { Router } from 'express';

import config from '../config.js';
// Cancelamos la importación de los usuarios de prueba desde data.js,
// porque a partir de ahora los recuperaremos desde la base de datos MongoDB.
// import { users } from '../data.js';
import { uploader } from '../uploader.js';

// Importamos el modelo para poder realizar las consultas a la bbdd (base de datos)
// a través de él
import usersModel from '../models/users.model.js';

const router = Router();

/**
 * Las solicitudes a bbdds se deben manejar de forma asíncrona,
 * por lo cual convertimos el callback del endpoint en (async)
 * y esperamos (await) la respuesta del motor MongoDB.
 * 
 * Observar que utilizamos en este caso el método find() sin argumentos,
 * y aplicado al modelo usersModel que hemos importado, esto devolverá
 * todos los usuarios cargados en la colección
 */
router.get('/', async (req, res) => {
    const users = await usersModel.find();
    res.status(200).send({ origin: config.SERVER, payload: users });
});

/**
 * En este otro ejemplo, utilizamos el método findById para recuperar
 * los datos de un usuario específico.
 * 
 * Por supuesto, agregaremos luego más controles, es importante verificar
 * los parámetros antes de pasarlos a los métodos que consultan la bbdd.
 */
router.get('/one/:id', async (req, res) => {
    const user = await usersModel.findById(req.params.id);
    res.status(200).send({ origin: config.SERVER, payload: user });
});

/**
 * En breve continuaremos completando el CRUD
 */
router.post('/', uploader.single('thumbnail'), (req, res) => {
    const socketServer = req.app.get('socketServer');

    console.log(req.file);
    console.log(req.body);
    users.push(req.body);
    res.status(200).send({ origin: config.SERVER, payload: req.body });

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
