import { Router } from 'express';

import config from '../config.js';

const router = Router();

/**
 * Al activar el módulo express-session (ver app.js), aparece un objeto
 * req.session que PERSISTE entre llamadas a distintos endpoints.
 * 
 * De esta manera podemos utilizarlo para guardar y verificar info de usuario
 */

/**
 * Un pequeño middleware para controlar el rol de usuario, aprovechando los
 * datos almacenados en la sesión (req.session.user)
 * 
 * Si el rol guardado en el req.session.user no es admin, devolvemos error,
 * sino continuamos la cadena de express (next)
 */
const adminAuth = (req, res, next) => {
    if (req.session.user.role !== 'admin') return res.status(401).send({ origin: config.SERVER, payload: 'Acceso no autorizado: se requiere nivel de admin' });

    next();
}

router.get('/counter', async (req, res) => {
    try {
        // Si hay un counter en req.session, lo incrementamos, sino lo creamos con valor 1
        if (req.session.counter) {
            req.session.counter++;
            res.status(200).send({ origin: config.SERVER, payload: `Visitas: ${req.session.counter}` });
        } else {
            req.session.counter = 1;
            res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido, es tu primer visita!' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

/**
 * Nuestro primer login!.
 * 
 * Por ahora con datos de usuario fijos, solo para probar.
 * Si coincide lo ingresado con lo existente en base de datos,
 * guardamos info de ese usuario en req.session (req.session.user).
 * 
 * Por supuesto, podemos armar y guardar las propiedades que deseemos
 */
router.get('/login', async (req, res) => {
    try {
        // Esto simula datos ingresados desde un formulario
        const email = 'idux.net@gmail.com';
        const password = 'abc123';
        
        // Esto simula datos existentes en base de datos
        const savedNamed = 'Carlos Perren';
        const savedEmail = 'idux.net@gmail.com';
        const savedPassword = 'abc123';
        const savedRole = 'premium';

        if (email !== savedEmail || password !== savedPassword) {
            return res.status(401).send({ origin: config.SERVER, payload: 'Datos de acceso no válidos' });
        }
        
        req.session.user = { name: savedNamed, email: email, role: savedRole };
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

/**
 * En esta ruta privada, agregamos un pequeño middleware adminAuth (ver arriba),
 * que chequea el rol almacenado en la sesión de usuario; solo si es admin le
 * permitirá continuar.
 */
router.get('/private', adminAuth, async (req, res) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido ADMIN!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

// Limpiamos los datos de sesión
router.get('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: 'Error al ejecutar logout', error: err });
            res.status(200).send({ origin: config.SERVER, payload: 'Usuario desconectado' });
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
