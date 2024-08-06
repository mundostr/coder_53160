import config, { errorsDictionary } from '../config.js';

/**
 * Este handler se habilita globalmente con use() en app.js, y captura
 * todos los errores que se disparen, para comparar contra el diccionario
 * y devolver el mensaje correspondiente.
 * 
 * En nuestro caso hemos colocado el diccionario en config.js, podría estar
 * en archivo separado, pero el concepto de centralizar el manejo de errores
 * es un punto importante en cualquier app de mayor nivel.
 * 
 * Ver ejemplo de disparo de error en verifyRequiredBody dentro de utils.js
 */
const errorsHandler = (error, req, res, next) => {
    console.log('ingresa');
    let customErr = errorsDictionary[0];
    for (const key in errorsDictionary) {
        if (errorsDictionary[key].code === error.type.code) customErr = errorsDictionary[key];
    }
    
    return res.status(customErr.status).send({ origin: config.SERVER, payload: '', error: customErr.message });
}

export default errorsHandler;
