import { Router } from 'express';
import passport from 'passport';

import config from '../config.js';
import { createHash, isValidPassword, verifyRequiredBody } from '../utils.js';
import UsersManager from '../dao/users.manager.mdb.js';
import initAuthStrategies from '../auth/passport.strategies.js';

const router = Router();
const manager = new UsersManager();
initAuthStrategies();

const verifyAdmin = (req, res, next) => {
    // ?: operador opcional: si no existe el objeto req.session.user o el role no es admin
    if (req.session.user?.role !== 'admin')
        return res.status(403).send({ origin: config.SERVER, payload: 'Acceso no autorizado: se requiere autenticación y nivel de admin' });

    next();
}

/**
 * Este endpoint es solo temporal para poder hashear claves de prueba
 * El método createHash se utiliza al llamar al add del manager (ver ejemplo
 * post /register debajo)
 */
router.get('/hash/:password', async (req, res) => {
    res.status(200).send({ origin: config.SERVER, payload: createHash(req.params.password) });
});

router.post('/register', verifyRequiredBody(['firstName', 'lastName', 'email', 'password']), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const foundUser = await manager.getOne({ email: email });

        // Si NO se encuentra ya registrado el email, continuamos y creamos
        // un nuevo usuario standard (tipo user)
        if (!foundUser) {
            const process = await manager.add({ firstName, lastName, email, password: createHash(password)});
            res.status(200).send({ origin: config.SERVER, payload: process });
        } else {
            res.status(400).send({ origin: config.SERVER, payload: 'El email ya se encuentra registrado' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/login', verifyRequiredBody(['email', 'password']), async (req, res) => {
    try {
        /**
         * Tratamos de ubicar un usuario por email, y en caso
         * de existir, comparamos el hash de la password recibida
         * por formulario con el hash de la propiedad password
         * del usuario recuperado. Si todo coincide, continuamos.
         * 
         * Atención!: observar el req.session.save con su callback,
         * para asegurar que se hayan guardado los datos de sesión
         * antes de realizar la redirección.
         */
        const { email, password } = req.body;
        const foundUser = await manager.getOne({ email: email });

        if (foundUser && isValidPassword(password, foundUser.password)) {
            // En lugar de armar req.session.user manualmente, aprovechamos el operador spread (...)
            // para quitar la password del objeto foundUser y utilizar lo demás
            const { password, ...filteredFoundUser } = foundUser;
            // req.session.user = { firstName: foundUser.firstName, lastName: foundUser.lastName, email: email, role: foundUser.role };
            req.session.user = filteredFoundUser;
            req.session.save(err => {
                if (err) return res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });

                res.redirect('/profile');
            });
        } else {
            res.status(401).send({ origin: config.SERVER, payload: 'Datos de acceso no válidos' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/pplogin', verifyRequiredBody(['email', 'password']), passport.authenticate('login', { failureRedirect: `/login?error=${encodeURI('Usuario o clave no válidos')}`}), async (req, res) => {
    try {
        // Passport inyecta los datos del done en req.user
        req.session.user = req.user;
        req.session.save(err => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
        
            res.redirect('/profile');
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

/**
 * Utilizamos el middleware verifyAdmin (ver arriba) para verificar si el usuario
 * está autenticado (tiene una sesión activa) y es admin
 */
router.get('/admin', verifyAdmin, async (req, res) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido ADMIN!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: 'Error al ejecutar logout', error: err });
            res.redirect('/login');
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
