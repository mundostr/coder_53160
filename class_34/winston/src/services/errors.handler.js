import config, { errorsDictionary } from '../config.js';

const errorsHandler = (error, req, res, next) => {
    /* for (const key in errorsDictionary) {
        if (errorsDictionary[key] === error.type) {
            return res.status(errorsDictionary[key].code).send({ origin: config.SERVER, payload: '', error: `${error.name} - ${errorsDictionary[key].message}` });
        }
    }
    
    return res.status(500).send({ origin: config.SERVER, payload: '', error: 'ERROR no identificado' }); */
    
    let customErr = errorsDictionary[0];
    for (const key in errorsDictionary) {
        if (errorsDictionary[key].code === error.type.code) customErr = errorsDictionary[key];
    }
    return res.status(customErr.status).send({ origin: config.SERVER, payload: '', error: customErr.message });
}

export default errorsHandler;
