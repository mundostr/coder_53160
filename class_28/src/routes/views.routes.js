import { Router } from 'express';

import config from '../config.js';
import ProductsManager from '../controllers/products.manager.js';

const router = Router();
const manager = new ProductsManager();

router.get('/realtime_products/:page', async (req, res) => {
    const data = await manager.getPaginated(config.PRODUCTS_PER_PAGE, req.params.page);
    res.render('realtime_products', { data: data });
});

router.get('/register', (req, res) => {
    res.render('register', {});
});

router.get('/login', (req, res) => {
    if (req.user) return res.redirect('/profile');
    res.render('login', { showError: req.query.error ? true: false, errorMessage: req.query.error });
});

router.get('/profile', (req, res) => {
    if (!req.user) return res.redirect('/login');
    res.render('profile', { user: req.session.user });
});

export default router;
