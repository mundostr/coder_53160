import { Router } from 'express';

import Controller from '../controllers/business.controller.js';
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

router.post('/', verifyRequiredBody(['name']), async (req, res) => {
    try {
        const data = { name: req.body.name };
        res.status(200).send({ status: 'OK', data: await controller.add(data) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.put('/:id', verifyAllowedBody(['name', 'products']), async (req, res) => {
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
