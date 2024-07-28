import { Router} from 'express';
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

router.get('/simple', async (req, res) => {
    let total = 0;
    for (let i = 0; i < 100000; i++) total += i;
    res.status(200).send({ status: 'OK', data: total });
})

router.get('/complex', async (req, res) => {
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i; // 5e8 = 4 y 8 ceros = 500.000.000
    res.status(200).send({ status: 'OK', data: total });
})

router.post('/login',sessionsController.loginUser);
router.post('/register',sessionsController.registerUser);


export default router;