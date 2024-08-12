import { Router } from 'express';

import config from '../config.js';
import CartsManager from '../dao/carts.manager.mdb.js';
import ProductsManager from '../dao/products.manager.mdb.js';
import { verifyToken } from '../utils.js';

const router = Router();
const manager = new CartsManager();
const productManager = new ProductsManager();

export const checkOwnership = async (pid, email) => {
    const product = await manager.getById(pid);
    if (!product) return false;
    return product.owner === email;
}

router.put('/:cid/products/:pid/:qty', verifyToken, async (req, res) => {
    try {
        // Validar formato de cid, pid y qty, sea con middleware o manualmente acá
        const cid = req.params.cid;
        const pid = req.params.pid;
        const qty = req.params.qty;
        const email = req.user.email;
        let proceedWithCartUpdate = true;

        if (req.user.role === 'premium') proceedWithCartUpdate = !await checkOwnership(pid, email);

        if (proceedWithCartUpdate) {
            // Ejecutar rutina de modificación de array products en carrito
            res.status(200).send({ origin: config.SERVER, payload: 'Producto agregado' });
        } else {
            res.status(200).send({ origin: config.SERVER, payload: 'No puede agregar productos propios al carrito' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
