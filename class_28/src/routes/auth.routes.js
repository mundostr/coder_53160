import { Router } from 'express';

import config from '../config.js';
import { isValidPassword, verifyRequiredBody, createToken, verifyToken, handlePolicies } from '../services/utils.js';
import UsersManager from '../controllers/users.manager.js';

const router = Router();
const manager = new UsersManager();

router.post('/login', verifyRequiredBody(['email', 'password']), async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await manager.getOne({ email: email });

        if (foundUser && isValidPassword(password, foundUser.password)) {
            const { password, ...filteredFoundUser } = foundUser;
            const token = createToken(filteredFoundUser, '1h');
            res.cookie(`${config.APP_NAME}_cookie`, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
            res.status(200).send({ origin: config.SERVER, payload: 'Usuario autenticado' });
        } else {
            res.status(401).send({ origin: config.SERVER, payload: 'Datos de acceso no válidos' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/admin', verifyToken, handlePolicies(['admin']), async (req, res) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido ADMIN!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/logout', async (req, res) => {
    try {
        req.user = null;
        res.redirect('/login');
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
