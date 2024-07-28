import { Router } from 'express';
import compression from 'express-compression';

import config from '../config.js';
import { uploader } from '../services/uploader.js';
import { verifyMongoDBId } from '../services/utils.js';
import ProductsManager from '../controllers/products.manager.mdb.js';

const router = Router();
const manager = new ProductsManager();

router.param('id', verifyMongoDBId());

// ruta prueba compresión
router.get('/teststring', compression({ brotli: { enabled: true, zlib: {}}}), async (req, res) => {
    try {
        let string = '';
        const base = 'Prueba de compresión Back Comisión 53160';
        for (let i = 0; i < 10e4; i++) string += base; // 100000

        res.status(200).send({ origin: config.SERVER, payload: string });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await manager.getPaginated(50, 1);

        res.status(200).send({ origin: config.SERVER, payload: products });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/one/:id', async (req, res) => {
    try {
        const product = await manager.getById(req.params.id);
        res.status(200).send({ origin: config.SERVER, payload: product });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    try {
        const socketServer = req.app.get('socketServer');
        const process = await manager.add(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });

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
