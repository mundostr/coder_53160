import { Router } from 'express';

import Controller from '../controllers/user.controller.js';
import { verifyRequiredBody, verifyAllowedBody, verifyMongoDBId } from '../services/utils.js';

const router = Router();
const controller = new Controller();

router.param('id', verifyMongoDBId());

router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.get() });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.post('/', verifyRequiredBody(['firstName', 'lastName', 'email', 'password']), async (req, res) => {
    try {
        const data = { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password };
        res.status(200).send({ status: 'OK', data: await controller.add(data) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.put('/:id', verifyAllowedBody(['firstName', 'lastName', 'email', 'password', 'role', 'orders']), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.update(req.params.id, req.body) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.delete(req.params.id) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

export default router;
