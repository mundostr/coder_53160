import { Router } from 'express';

import config from '../config.js';
import { createToken } from '../utils.js';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        // Queda hardcodeado SOLO COMO PRUEBA
        const token = createToken({ email: 'idux.net@gmail.com', role: 'admin' }, '1h');
        res.cookie(`${config.APP_NAME}_cookie`, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.status(200).send({ origin: config.SERVER, payload: 'Usuario autenticado' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
