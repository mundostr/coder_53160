/**
 * CLASE 11
 * 
 * Creación de plantilla de chat, con posibilidad de indicar usuario, enviar mensaje
 * y observar el historial de enviados
 * 
 */

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import config from './config.js';
import usersRouter from './routes/users.routes.js';
import viewsRouter from './routes/views.routes.js';

const app = express();

let messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));

const httpServer = app.listen(config.PORT, () => {
    console.log(`App activa en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
// El método set() nos permite setear objetos globales para nuestra app.
// En este caso lo aprovechamos para socketServer, que luego recuperaremos
// desde los endpoints donde necesitemos publicar mensajes Websockets.
app.set('socketServer', socketServer);

socketServer.on('connection', client => {
    /**
     * Cada vez que un nuevo cliente se conecta, se publica en el tópico
     * chatLog la lista actual de mensajes del chat, SOLO para ese cliente.
     */
    client.emit('chatLog', messages);
    console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

    /**
     * Cada vez que llega un nuevo mensaje desde algún cliente,
     * sea actualiza la lista de chats del servidor (solo un array
     * en memoria para este ejemplo), y se emite un contenido en el tópico
     * messageArrived, hacia TODOS los clientes conectados.
     */
    client.on('newMessage', data => {
        messages.push(data);
        console.log(`Mensaje recibido desde ${client.id}: ${data.user} ${data.message}`);

        socketServer.emit('messageArrived', data);
    });
});
