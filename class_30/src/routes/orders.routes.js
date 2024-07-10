import { Router } from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

import Controller from '../controllers/order.controller.js';
import { verifyRequiredBody, verifyAllowedBody, verifyMongoDBId } from '../services/utils.js';

import config from '../config.js';

const router = Router();
const controller = new Controller();
// Config nodeMailer
// Generamos un "transporte" para nodemailer, que es esencialmente
// la configuración de un servidor SMTP a través del cual enviar.
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_APP_USER,
        // Atención!, si se va a aplicar un STMP de Gmail,
        // NO podrá usarse la clave original, se debe generar
        // una clave de app en su lugar:
        // https://myaccount.google.com/apppasswords.
        pass: config.GMAIL_APP_PASS
    }
});

// Config Twilio (twilio.com)
// Generar cuenta gratuita, obtener número telefónico de prueba
// y agendar credenciales (SID, TOKEN y NUMBER)
const twilioClient = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);

router.param('id', verifyMongoDBId());

router.get('/mail', async (req, res) => {
    try {
        // Utilizando el transporte, podemos enviar a través
        // del SMTP que hayamos configurado, mensajes vía email
        // a los destinatarios que deseemos
        const confirmation = await transport.sendMail({
            from: `Sistema Coder <${config.GMAIL_APP_USER}>`, // email origen
            to: 'email@destino.com',
            subject: 'Pruebas Nodemailer',
            html: '<h1>Prueba 01</h1>'
        });
        res.status(200).send({ status: 'OK', data: confirmation });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.get('/sms', async (req, res) => {
    try {
        // Mediante el servicio messages de twilio podemos enviar mensajes SMS.
        // En la cuenta gratuita solo tendremos algunos dólares virtuales de crédito
        // y la posibilidad de enviar únicamente a números verificados:
        // https://console.twilio.com/us1/develop/phone-numbers/manage/verified
        // pero será suficiente para probar.
        const confirmation = await twilioClient.messages.create({
            body: 'Mensaje enviado con servicio Twilio',
            from: config.TWILIO_PHONE,
            to: 'telefono_destino'
        });
        res.status(200).send({ status: 'OK', data: confirmation });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.get() });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.post('/', verifyRequiredBody(['business', 'user', 'products']), async (req, res) => {
    try {
        const data = { number: req.body.number, business: req.body.business, user: req.body.user, products: req.body.products };
        res.status(200).send({ status: 'OK', data: await controller.add(data) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.put('/:id', verifyAllowedBody(['business', 'user', 'products', 'status']), async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.update(req.params.id, req.body) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        res.status(200).send({ status: 'OK', data: await controller.delete(req.params.id) });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

export default router;
