import { fork } from 'child_process';
import { Router } from 'express';

import config from '../config.js';

const router = Router();

/**
 * Recibe una cantidad variable de parámetros
 * Si alguno no es numérico, corta la ejecución del script con un error -4
 * Ver app.js para captura (listener) de este error.
 */
const listNumbers = (...numbers) => {
    numbers.forEach(number => {
        if (isNaN(number)) {
            console.log('Invalid parameters');
            process.exit(-4);
        } else {
            console.log(number);
        }
    });
}

const complexOp = () => {
    let result = 0;
    for (let i = 0; i <= 3e9; i++ ) result += i // 3 000 000 000
    return result;
}

router.get('/', async (req, res) => {
    res.status(200).send({ origin: config.SERVER, payload: `Servidor activo por ${process.uptime().toFixed(1)}` });
});

/**
 * Endpoint para ejecución de una función que dispara un exit.
 * En app.js habilitamos un listener de process para capturar ese evento.
 * 
 * Esta es solo una muestra, más adelante realizaremos una captura central
 * de errores con Express, e internamente el sistema aprovechará esta gestión
 * de process.
 */
router.get('/list', async (req, res) => {
    listNumbers(1, 2, 3, 4, 5);
    // listNumbers(1, 'Pepe', 3, 4, 5);
    res.status(200).send({ origin: config.SERVER, payload: `Función ejecutada` });
});

/**
 * Endpoint standard.
 * 
 * Ejecuta la llamada a una operación que tarda mucho tiempo.
 * Durante ese lapso, cualquier solicitud a otro endpoint será BLOQUEADA.
 * 
 * Probar accediendo a este endpoint y en ventana separada tratar de acceder
 * por ej al endpoint raíz /, se verá que la respuesta al raíz queda demorada
 * hasta que se termine de procesar esta solicitud.
 */
router.get('/complexwrong', async (req, res) => {
    res.status(200).send({ origin: config.SERVER, payload: complexOp() });
});

/**
 * Endpoint con CHILD PROCESS.
 * 
 * En lugar de llamar a la función bloqueante de manera directa, crea un proceso
 * hijo (child process), le envía un mensaje para que comience a trabajar y habilita
 * un listener.
 * 
 * El contenido que ejecuta el proceso hijo se encuentra en archivo separado (complex.js),
 * cuando finaliza, retorna un resultado que el listener en el endpoint recibe para
 * proceder con la respuesta.
 * 
 * De esta forma el hilo principal se libera rápidamente y puede seguir atendiendo
 * solicitudes a otros endpoints. Repetir la prueba indicada arriba y ver la diferencia.
 */
router.get('/complexok', async (req, res) => {
    const child = fork('src/complex.js');
    child.send('start');
    child.on('message', result => {
        res.status(200).send({ origin: config.SERVER, payload: result });
    });
});

export default router;
