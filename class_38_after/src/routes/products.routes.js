import { Router } from 'express';

import config from '../config.js';
import ProductsManager from '../dao/products.manager.mdb.js';
import { verifyToken, handlePolicies } from '../utils.js';

const router = Router();
const manager = new ProductsManager();

export const checkOwnership = async (pid, email) => {
    const product = await manager.getById(pid);
    if (!product) return false;
    return product.owner === email;
}

router.post('/', verifyToken, handlePolicies(['admin', 'premium']), async (req, res) => {
    try {
        // Estos datos vendrían del req.body
        // VALIDAR antes de continuar
        const newProduct = {
            title: 'El nuevo producto',
            price: 8000.22,
            stock: 100,
            owner: req.user.role === 'premium' ? req.user.email : 'admin'
        };

        // Llamar a rutina del controlador que carga el producto
        res.status(200).send({ origin: config.SERVER, payload: 'Producto cargado' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:pid', verifyToken, handlePolicies(['admin', 'premium']), async (req, res) => {
    try {
        // Validar formato de pid, sea con middleware o manualmente acá
        const pid = req.params.pid;
        const email = req.user.email;
        let proceedWithDelete = true;

        if (req.user.role === 'premium') proceedWithDelete = await checkOwnership(pid, email);

        if (proceedWithDelete) {
            // Ejecutar llamada a método para borrar producto
            res.status(200).send({ origin: config.SERVER, payload: 'Producto borrado' });
        } else {
            res.status(200).send({ origin: config.SERVER, payload: 'No tiene permisos para borrar el producto' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
