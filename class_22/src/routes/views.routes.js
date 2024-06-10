import { Router } from 'express';

import config from '../config.js';
import ProductsManager from '../dao/products.manager.mdb.js';

const router = Router();
const manager = new ProductsManager();

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

router.get('/realtime_products/:page', async (req, res) => {
    const data = await manager.getAll(config.PRODUCTS_PER_PAGE, req.params.page);
    res.render('realtime_products', { data: data });
});

router.get('/register', (req, res) => {
    res.render('register', {});
});

router.get('/login', (req, res) => {
    // Si hay datos de sesión activos, redireccionamos al perfil
    if (req.session.user) return res.redirect('/profile');
    res.render('login', { showError: req.query.error ? true: false, errorMessage: req.query.error });
});

router.get('/profile', (req, res) => {
    // Si NO hay datos de sesión activos, redireccionamos al login
    if (!req.session.user) return res.redirect('/login');
    res.render('profile', { user: req.session.user });
});

export default router;
