import { Router } from 'express';

import config from '../config.js';
import usersModel from '../dao/models/users.model.js';

const router = Router();

/**
 * Aggregate nos permite ejecutar varios procesos en una misma consulta.
 * Muy útil cuando necesitamos generar estadísticas o calcular totales
 * sobre las consultas, es decir, no retornar los datos de la colección
 * tal cual se encuentran almacenados, sino realizar cálculos sobre esos
 * datos en la propia consulta.
 * 
 * En este ejemplo, efectuamos 3 procesos (stages):
 * 1- Filtrado por rol.
 * 2- Agrupamiento y cálculo de suma total de grades por región (ver modelo).
 * 3- Ordenamiento por total de grades descendente (-1).
 */
router.get('/aggregate/:role', async (req, res) => {
    try {
        if (req.params.role === 'admin' || req.params.role === 'premium' || req.params.role === 'user') {
            const process = await usersModel.aggregate([
                { $match: { role: req.params.role } },
                { $group: { _id: '$region', totalGrade: {$sum: '$grade'} } },
                { $sort: { totalGrade: -1 } }
            ]);

            res.status(200).send({ origin: config.SERVER, payload: process });
        } else {
            res.status(200).send({ origin: config.SERVER, payload: null, error: 'role: solo se acepta admin, premium o user' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

/**
 * Este endpoint es para pruebas con Mongoose Paginate V2.
 * 
 * Al realizar la consulta con el método paginate, nos retornará
 * un objeto docs con el contenido propiamente dicho de la consulta,
 * y una serie de datos adicionales con información de paginado
 * (página actual, total de páginas, si existe página previa, si existe
 * página siguiente, cuál es la previa, cuál la siguiente, etc).
 */
router.get('/paginate/:page', async (req, res) => {
    try {
        // Podríamos paginar manualmente con skip, limit, pero es más
        // práctico y eficiente con Mongoose Paginate
        // const process = await usersModel.find().skip(0).limit(8).lean();

        /**
         * paginate toma 2 objetos como parámetros; el primero es equivalente
         * al objeto que pasaríamos a un filter para filtrar los datos que nos
         * interesan; el segundo contiene los parámetros para armar el paginado,
         * en este caso le indicamos que queremos recuperar la página 1,
         * utilizando un límite de 100 por página. paginate se encargará de
         * devolvernos los datos de paginado en base a esos parámetros, teniendo
         * luego esos datos, podremos reenviarlos por ej a una plantilla o a un
         * frontend para armar la botonera de paginado.
         */
        const process = await usersModel.paginate({ role: 'admin' }, { page: 1, limit: 100 });

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const process = await usersModel.create(req.body);
        
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
        const process = await usersModel.findOneAndUpdate(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const process = await usersModel.findOneAndDelete(filter);

        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

export default router;
