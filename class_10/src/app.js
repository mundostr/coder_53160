/**
 * CLASE 10
 * 
 * Agregamos soporte Websockets a nuestra aplicación,
 * para poder manejar mensajes en tiempo real que nos permitan mayor
 * dinamismo (por ejemplo, notificar a los clientes cuando se carga un
 * nuevo producto en oferta).
 * 
 * Instalamos socket.io (una implementación de Websockets) e importamos el Server.
 */

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import config from './config.js';
import usersRouter from './routes/users.routes.js';
import viewsRouter from './routes/views.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));

// Asignamos la instancia en escucha del servidor API a una constante
const httpServer = app.listen(config.PORT, () => {
    console.log(`App activa en puerto ${config.PORT}`);
});

// Para poder utilizarla como parámetro al crear el servidor Websockets.
// Se necesita este enlace, ya que la comunicación inicial parte de una
// solicitud HTTP.
const socketServer = new Server(httpServer);
// El método set() nos permite setear objetos globales para nuestra app.
// En este caso lo aprovechamos para socketServer, que luego recuperaremos
// desde los endpoints donde necesitemos publicar mensajes Websockets.
app.set('socketServer', socketServer);

/**
 * Activamos un listener (una rutina de escucha) para quedar atentos
 * a eventos de tipo "connection".
 * 
 * De esta forma, cada vez que un cliente se conecte al servidor Websockets,
 * se ejecutará el callback.
 * 
 * Dentro del propio callback, inicializamos otro listener que "escuchará"
 * mensajes llegados bajo el tópico newMessage.
 */
socketServer.on('connection', client => {
    console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

    // Cuando un cliente emite un contenido en "newMessage", el servidor es
    // notificado y a su vez, emite una confirmación a ESE cliente (newMessageConfirmation)
    client.on('newMessage', data => {
        console.log(`Mensaje recibido desde ${client.id}: ${data}`);
        client.emit('newMessageConfirmation', 'OK');
    });
});
