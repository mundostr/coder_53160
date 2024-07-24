import { Router } from 'express';
import compression from 'express-compression';

import config from '../config.js';
import { uploader } from '../services/uploader.js';
import { verifyMongoDBId } from '../services/utils.js';
import ProductsManager from '../controllers/products.manager.mdb.js';

const router = Router();
const manager = new ProductsManager();

router.param('id', verifyMongoDBId());

/**
 * Endpoint prueba módulo express-compression
 * Mostramos la activación del módulo para comprimir el contenido de la respuesta.
 * Inspeccionando desde las herramientas de desarrollo del navegador, se puede apreciar
 * la diferencia en el tamaño del envío.
 * 
 * Por supuesto hay situaciones en las cuales la compresión es más efectiva que en otras,
 * por ej para archivos repetitivos de texto, pdf (manuales), determinadas imágenes.
 * No en todos los casos se justifica su activación.
 * 
 * En muchos servicios cloud este punto se gestiona de forma automática.
 */
router.get('/longstring', compression({ brotli: { enabled: true, zlib: {}}}), async (req, res) => {
    try {
        const base = 'Prueba módulo compression Coder 53160';
        let string = '';
        for (let i = 0; i < 10e4; i++) string += base;

        res.status(200).send({ origin: config.SERVER, payload: string });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

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
