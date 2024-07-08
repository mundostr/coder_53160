import bcrypt from 'bcrypt';

import config from '../config.js';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const verifyHash = (passwordToVerify, storedHash) => bcrypt.compareSync(passwordToVerify, storedHash);

/**
 * 
 * @param {Array} requiredFields Array de campos requeridos
 * @returns status 400 o next
 */
export const verifyRequiredBody = (requiredFields) => {
    return (req, res, next) => {
        if (!Array.isArray(requiredFields)) res.status(400).send({ origin: config.SERVER, payload: 'Solicitud interna mal formada (código 5): se requiere array' });
        
        const allOk = requiredFields.every(field => 
            req.body.hasOwnProperty(field) && req.body[field] !== '' && req.body[field] !== null && req.body[field] !== undefined
        );
        
        if (!allOk) return res.status(400).send({ origin: config.SERVER, payload: 'Faltan propiedades', requiredFields });
        
        next();
    };
};

export const verifyAllowedBody = (allowedFields) => {
    return (req, res, next) => {
        req.body = allowedFields.reduce((filteredBody, key) => {
            if (req.body.hasOwnProperty(key) && req.body[key] !== '') filteredBody[key] = req.body[key];
            return filteredBody;
          }, {});
        
        next();
    };
};

export const verifyMongoDBId = (id) => {
    return (req, res, next) => {
        if (!config.MONGODB_ID_REGEX.test(req.params.id)) {
            return res.status(400).send({ origin: config.SERVER, payload: null, error: 'Id no válido' });
        }
    
        next();
    }
}
