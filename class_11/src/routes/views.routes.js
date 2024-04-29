import { Router } from 'express';
import { data } from '../data.js';

const router = Router();

router.get('/welcome', (req, res) => {
    const user = { firstName: 'Carlos' };
    res.render('index', user);
});

router.get('/users', (req, res) => {
    const users = { users: data };
    res.render('users', users);
});

router.get('/chat', (req, res) => {
    res.render('chat', {});
});

export default router;
