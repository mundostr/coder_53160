import { Router } from 'express';

import config from '../config.js';
import ProductsManager from '../controllers/products.manager.mdb.js';

const router = Router();
const manager = new ProductsManager();

router.get('/realtime_products/:page', async (req, res) => {
    const data = await manager.getAll(config.PRODUCTS_PER_PAGE, req.params.page);
    res.render('realtime_products', { data: data });
});

router.get('/register', (req, res) => {
    res.render('register', {});
});

router.get('/login', (req, res) => {
    res.render('login', { showError: req.query.error ? true: false, errorMessage: req.query.error });
});

router.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});

export default router;
