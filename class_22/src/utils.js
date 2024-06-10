import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from './config.js';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (passwordToVerify, storedHash) => bcrypt.compareSync(passwordToVerify, storedHash);

/**
 * Generamos un par más de utilidades, para crear y verificar un token tipo JWT,
 * aprovechando el módulo jsonwebtoken.
 * 
 * La creación es muy sencilla mediante el método sign.
 * expiresIn se puede expresar en string, por ej 1h (1 hora), 5m (5 minutos)
 */
export const createToken = (payload, duration) => jwt.sign(payload, config.SECRET, { expiresIn: duration });

/**
 * Recordemos que un token es una credencial que el cliente debe enviar junto con la solicitud.
 * Las 3 formas más habituales de envío son:
 * 1) Por header: bajo el nombre Authorization y el valor precedido de Bearer y espacio.
 * 2) Por cookie
 * 3) Por query
 * 
 * Podemos ver debajo cómo el middleware intenta extraer un token de alguna de las 3 opciones.
 */
export const verifyToken = (req, res, next) => {
    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1]: undefined;
    const cookieToken = req.cookies && req.cookies[`${config.APP_NAME}_cookie`] ? req.cookies[`${config.APP_NAME}_cookie`]: undefined;
    const queryToken = req.query.access_token ? req.query.access_token: undefined;
    const receivedToken = headerToken || cookieToken || queryToken;

    if (!receivedToken) return res.status(401).send({ origin: config.SERVER, payload: 'Se requiere token' });

    jwt.verify(headerToken, config.SECRET, (err, payload) => {
        if (err) return res.status(403).send({ origin: config.SERVER, payload: 'Token no válido' });
        req.user = payload;
        next();
    });
}

export const verifyRequiredBody = (requiredFields) => {
    return (req, res, next) => {
        const allOk = requiredFields.every(field => 
            req.body.hasOwnProperty(field) && req.body[field] !== '' && req.body[field] !== null && req.body[field] !== undefined
        );
        
        if (!allOk) return res.status(400).send({ origin: config.SERVER, payload: 'Faltan propiedades', requiredFields });
  
      next();
    };
};
