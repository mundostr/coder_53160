import { Router } from 'express';

import config from '../config.js';

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { showError: req.query.error ? true: false, errorMessage: req.query.error });
});

router.get('/profile', (req, res) => {
    res.render('profile', { user: req.user });
});

export default router;
