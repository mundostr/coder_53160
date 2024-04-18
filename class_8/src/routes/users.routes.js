/**
 * A partir de ahora, configuraremos los endpoints
 * en archivos dentro de esta carpeta, por ej un archivo
 * con rutas para manejo de usuarios, otro para productos, etc.
 */

import { Router } from 'express';
import { data } from '../data.js';
import { uploader } from '../uploader.js';

/**
 * Esta rutina es un MIDDLEWARE a nivel de endpoint, una función
 * en la cual podemos utilizar parámetros inyectados por Express
 * como req, res, next o error.
 * 
 * Podremos colocar este eslabón en la cadena de cualquier endpoint
 * que necesitemos, como vemos por ejemplo debajo en el primer GET.
 * 
 */
const firstMidd = (req, res, next) => {
    console.log('Se procesa el endpoint');
    
    // Esta función es propia de Express, con ella indicamos
    // que la "cadena" de ejecución debe continuar.
    // Por supuesto, podríamos evaluar aquí una condición y
    // retornar directamente alguna respuesta de error en lugar
    // de continuar
    next();
}

const router = Router();

/**
 * Cuando este endpoint reciba una solicitud, ejecutará primero
 * el middleware firstMidd, y luego seguirá con el callback que
 * le hemos configurado originalmente.
 */
router.get('/', firstMidd, (req, res) => {
    res.status(200).send({ origin: 'server1', payload: data });
});

/**
 * Otro ejemplo de MIDDLEWARE a nivel de endpoint,
 * en este caso utilizando un módulo externo (Multer)
 * para procesar la subida de un archivo que llega en
 * la solicitud bajo el nombre de thumbnail.
 * 
 * Como ya comentamos, la secuencia continuará luego
 * con la ejecución del callback del endpoint.
 */
router.post('/', uploader.single('thumbnail'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.status(200).send({ origin: 'server1', payload: req.body });
});

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
