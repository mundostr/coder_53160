import { Router } from 'express';

import config from '../config.js';
import usersModel from '../dao/models/users.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        // const process = await usersModel.find().lean();
        /**
         * Utilizamos este endpoint como ejemplo de acceso a datos con y sin indexación.
         * El método explain nos retorna una estadística de la consulta, en la cual podemos
         * ver los milisegundos que tarda el proceso específico en el motor de bbdd.
         * 
         * Si habilitamos un índice por apellido (lastName), agilizaremos la consulta.
         * (Ver archivo de modelo, modificador index: true en el campo)
         */
        const process = await usersModel.find({ lastName: 'Fahey' }).explain('executionStats');

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const process = await usersModel.create(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await usersModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await usersModel.findOneAndDelete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
