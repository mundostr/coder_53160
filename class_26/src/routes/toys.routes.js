import { Router } from 'express';
import getToys from '../controllers/toys.controller.js';

const router = Router();

router.get('/', async (req, res) => {
    const toysList = await getToys();
    res.status(200).send({ status: 'OK', data: toysList });
});

export default router;
