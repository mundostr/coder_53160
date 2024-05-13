import { Router } from 'express';
import { users, products } from '../data.js';

const router = Router();

router.get('/users', (req, res) => {
    res.render('users', { users: users });
});

router.get('/products', (req, res) => {
    res.render('realtime_products', { products: products });
});

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

export default router;
