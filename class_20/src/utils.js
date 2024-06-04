/**
 * Generamos un par de funciones para trabajar con claves,
 * una para crear el hash a partir de una clave plana, y la
 * otra para verificar validez aplicando el mismo hash a la
 * clave plana y comparando con la hasheada almacenada
 * 
 * La otra función es un middleware que verifica campos
 * obligatorios en el req.body,lo colocamos acá porque
 * podemos importarlo y aprovecharlo en distintos endpoints
 */

import bcrypt from 'bcrypt';

import config from './config.js';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (passwordToVerify, storedHash) => bcrypt.compareSync(passwordToVerify, storedHash);

export const verifyRequiredBody = (requiredFields) => {
    return (req, res, next) => {
        const allOk = requiredFields.every(field => 
            req.body.hasOwnProperty(field) && req.body[field] !== '' && req.body[field] !== null && req.body[field] !== undefined
        );
        
        if (!allOk) return res.status(400).send({ origin: config.SERVER, payload: 'Faltan propiedades', requiredFields });
  
      next();
    };
};
