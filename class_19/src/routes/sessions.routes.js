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
    if (!req.session.user || req.session.user.role !== 'admin')
        // Si no existe el objeto req.session.user o el role no es admin
        return res.status(401).send({ origin: config.SERVER, payload: 'Acceso no autorizado: se requiere autenticación y nivel de admin' });

    next();
}

/**
 * Implementar este endpoint
 * RECORDAR verificar que NO EXISTA el email antes de cargar el nuevo usuario
 */
router.post('/register', async (req, res) => {
});

router.post('/login', async (req, res) => {
    try {
        // Recuperamos los campos que llegan del formulario
        // Aquí luego se deberían agregar otras validaciones
        const { email, password } = req.body;
        
        // Esto simula datos existentes en base de datos
        // Reemplazar por llamada a método del manager que busque un usuario
        // filtrando por email y clave.
        // POR EL MOMENTO, probar guardando la clave plana en la colección (abc123)
        const savedFirstName = 'José';
        const savedLastName = 'Perez';
        const savedEmail = 'idux.net@gmail.com';
        const savedPassword = 'abc123';
        const savedRole = 'admin';

        if (email !== savedEmail || password !== savedPassword) {
            return res.status(401).send({ origin: config.SERVER, payload: 'Datos de acceso no válidos' });
        }
        
        req.session.user = { firstName: savedFirstName, lastName: savedLastName, email: email, role: savedRole };
        // res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido!' });
        // res.redirect nos permite redireccionar a una plantilla en lugar de devolver un mensaje
        res.redirect('/profile');
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

/**
 * Utilizamos el middleware adminAuth (ver arriba) para verificar si el usuario
 * está autenticado (tiene una sesión activa) y es admin
 */
router.get('/private', adminAuth, async (req, res) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido ADMIN!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: 'Error al ejecutar logout', error: err });
            // res.status(200).send({ origin: config.SERVER, payload: 'Usuario desconectado' });
            res.redirect('/login');
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
