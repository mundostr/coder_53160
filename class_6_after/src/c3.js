/**
 * 1- Importar express,
 * 2- crear la instancia del server,
 * 3- crear los endpoints
 * 4- poner a escuchar
 */

import express from 'express';
import ProductManager from './c2.js';

const PORT = 3000;
const app = express();
const manager = new ProductManager('./src/c2.json');

app.get('/products', async (req, res) => {
    const limit = +req.query.limit || 0;
    const products = await manager.getProducts(limit);
    
    res.send({ status: 1, payload: products });
});

app.get('/products/:pid', async (req, res) => {
    const product = await manager.getProductById(req.params.pid);
    
    res.send({ status: 1, payload: product });
});

app.listen(PORT, () => { console.log(`Servidor activo en puerto ${PORT}`); });
