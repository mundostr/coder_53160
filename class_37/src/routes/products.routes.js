import { Router } from 'express';
import nodemailer from 'nodemailer';

import config from '../config.js';
import { uploader } from '../services/uploader.js';
import { verifyMongoDBId, verifyToken, handlePolicies } from '../services/utils.js';
import ProductsManager from '../controllers/products.manager.mdb.js';

const router = Router();
const manager = new ProductsManager();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_APP_USER,
        // https://myaccount.google.com/apppasswords.
        pass: config.GMAIL_APP_PASS
    }
});

router.param('id', verifyMongoDBId());

router.get('/:page', async (req, res) => {
    try {
        const products = await manager.getPaginated(50, req.params.page || 1);

        res.status(200).send({ origin: config.SERVER, payload: products });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/one/:id', async (req, res) => {
    try {
        const product = await manager.getOne({ _id: req.params.id});
        res.status(200).send({ origin: config.SERVER, payload: product });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/', verifyToken, handlePolicies(['admin', 'premium']), uploader.single('thumbnail'), async (req, res) => {
    try {
        const socketServer = req.app.get('socketServer');
        const process = await manager.add(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });

        const confirmation = await transport.sendMail({
            from: `Sistema Coder <${config.GMAIL_APP_USER}>`, // email origen
            to: 'email@destino.com',
            subject: 'Pruebas Nodemailer',
            html: '<h1>Prueba 01</h1>'
        });

        socketServer.emit('newProduct', req.body);
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await manager.update(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await manager.delete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.all('*', async (req, res) => {
    res.status(404).send({ origin: config.SERVER, payload: null, error: 'No se encuentra la ruta solicitada' }); 
});

export default router;
