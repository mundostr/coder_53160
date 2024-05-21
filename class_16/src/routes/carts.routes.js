import { Router } from 'express';

import config from '../config.js';
import cartsModel from '../dao/models/carts.model.js';
import usersModel from '../dao/models/users.model.js';
// import productsModel from '../dao/models/products.model.js';

const router = Router();

/**
 * En lugar de hacer una consulta find plana, encadenamos el método populate.
 * 
 * Este método se coordina con la ref del modelo (_user_id en este caso) y
 * permite cruzar datos. De esta forma, realizamos UNA SOLA CONSULTA a la
 * colección de carritos (carts), pero ya obtenemos los datos completos del
 * usuario asociado.
 * 
 * Probar hacer lo mismo activando otro populate para cruzar los datos del
 * array de productos.
 */
router.get('/', async (req, res) => {
    try {
        // const process = await cartsModel.find().lean();
        const process = await cartsModel
            .find()
            .populate({ path: '_user_id', model: usersModel })
            .lean();
            // Se pueden encadenar varios populate en una sola consulta
            // .populate({ path: 'products._id', model: productsModel })

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const process = await cartsModel.create(req.body);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const update = req.body;
        const options = { new: true };
        const process = await cartsModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await cartsModel.findOneAndDelete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
