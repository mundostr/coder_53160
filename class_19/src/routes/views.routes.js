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

router.get('/register', (req, res) => {
    res.render('register', {});
});

router.get('/login', (req, res) => {
    // Si hay datos de sesión activos, redireccionamos al perfil
    if (req.session.user) return res.redirect('/profile');
    res.render('login', {});
});

router.get('/profile', (req, res) => {
    // Si NO hay datos de sesión activos, redireccionamos al loginm
    if (!req.session.user) return res.redirect('/login');
    res.render('profile', { user: req.session.user });
});

export default router;
