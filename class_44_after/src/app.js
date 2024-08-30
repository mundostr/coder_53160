/**
 * Esta es una app compacta para muestra de uso de Multer
 * Solo necesitamos generar el servicio de subida (ver uploader.js)
 * importarlo e inyectar el middleware de upload en los endpoints requeridos
 */

import express from 'express';

import config from './config.js';
import { uploader } from './uploader.js';

const PORT = 3000;
const app = express();
const uploadRouter = express.Router();

/**
 * Recordemos: para subir un solo archivo, utilizamos el método single de Multer,
 * para subir varios a la vez, el método array.
 */
uploadRouter.post('/products', uploader.array('productImages', 3), (req, res) => {
    res.status(200).send({ status: 'OK', payload: 'Imágenes subidas', files: req.files });
});

uploadRouter.post('/profiles', uploader.array('profileImages', 2), (req, res) => {
    res.status(200).send({ status: 'OK', payload: 'Imágenes subidas', files: req.files });
});

uploadRouter.post('/documents', uploader.array('documentImages', 3), (req, res) => {
    res.status(200).send({ status: 'OK', payload: 'Imágenes subidas', files: req.files });
});

app.use('/upload', uploadRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(PORT, () => {
    console.log(`Upload server active on http://localhost:${PORT}`);
});
