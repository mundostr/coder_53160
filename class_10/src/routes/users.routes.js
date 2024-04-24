import { Router } from 'express';
import { data } from '../data.js';
import { uploader } from '../uploader.js';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send({ origin: 'server1', payload: data });
});

/**
 * Endpoint para carga de nuevos usuarios.
 * uploader.single() nos permite cargar UNA imagen. Al generar la solicitud,
 * deberemos enviar correctamente el contenido de esa imagen (por ej un campo
 * de tipo file en un formulario), y lógicamente coincidir el nombre con el
 * esperado en el endpoint (thumbnail en este caso).
 * 
 * MUY IMPORTANTE: indicar method="post" y enctype="multipart/form-data" en el form
 * 
 * La info de la imagen estará disponible en req.file.
 */
router.post('/', uploader.single('thumbnail'), (req, res) => {
    // Esta es la forma de recuperar un objeto global (req.app.get);
    const socketServer = req.app.get('socketServer');

    console.log(req.file);
    console.log(req.body);
    res.status(200).send({ origin: 'server1', payload: req.body });

    socketServer.emit('newUser', 'Se cargó nuevo usuario');
});

/**
 * Misma rutina de arriba, pero ahora usamos el middleware uploader
 * para subir VARIAS imágenes (hasta 3 en este caso).
 * 
 * Deberemos enviar los datos de imagen en un array; si utilizamos
 * un formulario HTML, podemos hacer ésto con un campo tipo file
 * que tenga el atributo "multiple" (ver index.html en public).
 */
/* router.post('/', uploader.array('thumbnails', 3), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.status(200).send({ origin: 'server1', payload: req.body });
}); */

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {
        const { email = '', password = '' } = req.body;
        
        res.status(200).send({ origin: 'server1', payload: `Quiere modificar el id ${id} con el contenido del body`, body: { email, password } });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {        
        res.status(200).send({ origin: 'server1', payload: `Quiere borrar el id ${id}` });
    }
});

export default router;
