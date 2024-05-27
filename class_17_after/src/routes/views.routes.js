import { Router } from 'express';

import config from '../config.js';

const router = Router();

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/realtime_products', (req, res) => {
    const data = [];
    res.render('realtime_products', { data: data });
});

export default router;
