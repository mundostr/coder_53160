import { Router } from 'express';
import config from '../config.js';

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {} // Vacío, se redeclarará en clase heredada

    getRouter() {
        return this.router;
    }

    applyCallBacks(callBacks) {
        return callBacks.map(callBack => async (...params) => {
            try {
                await callBack.apply(this, params);
            } catch (err) {
                console.log(err);
                params[1].status(500).send({ origin: config.SERVER, payload: null, error: err.message });
            }
        })
    }

    generateCustomResponses(req, res, next) {
        res.sendSuccess = payload => res.status(200).send({ origin: config.SERVER, payload: payload });
        res.sendUserError = err => res.status(400).send({ origin: config.SERVER, payload: null, error: err.message });
        res.sendServerError = err => res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
        next();
    }

    get(path, ...callBacks) {
        this.router.get(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }

    post(path, ...callBacks) {
        this.router.post(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }

    put(path, ...callBacks) {
        this.router.put(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }

    delete(path, ...callBacks) {
        this.router.delete(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }
};
