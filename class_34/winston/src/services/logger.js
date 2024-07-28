import winston from 'winston';

import config from '../config.js';

const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'debug' })
    ]
});

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ level: 'info', filename: `${config.DIRNAME}/logs/errors.log`})
    ]
});

const addLogger = (req, res, next) => {
    // req.logger = devLogger;
    req.logger = config.MODE === 'dev' ? devLogger : prodLogger;
    // req.logger.info(`${new Date().toDateString()} ${req.method} ${req.url}`);
    next();
}

export default addLogger;
