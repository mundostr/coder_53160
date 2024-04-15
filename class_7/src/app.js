import express from 'express';
// Solo sacamos data a un archivo aparte para limpiar el archivo principal
import { data } from './data.js';

const PORT = 5000;
const app = express();

// Siempre que necesitemos parsear contenido JSON que llegue desde solicitudes
// http, agregaremos estas configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Habilitamos ahora 4 endpoints para realizar las operaciones básicas (CRUD),
 * esta es la relación con los tipos de solicitudes HTTP:
 * 
 * C -> Create -> POST
 * R -> Read -> GET
 * U -> Update -> PUT
 * D -> Delete -> DELETE
 */

// Este endpoint acepta una solicitud tipo GET y retorna data completo
app.get('/', (req, res) => {
    res.status(200).send({ origin: 'server1', payload: data });
});

/**
 * Este endpoint acepta una solicitud EN LA MISMA RUTA DEL ANTERIOR,
 * pero de tipo POST. Es normal que las solicitudes POST vayan acompañadas
 * de un body (cuerpo) con el contenido nuevo que deseamos enviar al servidor.
 * 
 * Express nos permite acceder a ese body en el endpoint, a través del objeto req.body.
 */
app.post('/', (req, res) => {
    /**
     * Esta desestructuración es práctica; si el body contiene las propiedades email
     * y password, las constantes email y password tomarán esos valores, pero si alguna
     * no se encuentra, tomará un valor por defecto.
     * 
     * De esta forma no se generará un error al chequear por ej password.length sin
     * existir la propiedad password.
     * 
     * También podríamos usar Object.keys(req.body).length para saber si el body
     * está vacío, o req.body.hasOwnProperty('password') para saber si incluye esa propiedad
     */
    const { email = '', password = '' } = req.body;
    
    if (password.length < 8) {
        res.status(400).send({ origin: 'server1', payload: [], error: 'Password mínimo 8 caracteres' });
    } else {
        res.status(200).send({ origin: 'server1', payload: { email, password } });
    }
});

/**
 * En este caso aprovechamos tanto un parámetro de tipo req.params (id),
 * como un body con un nuevo contenido que usaremos para modificar uno existente en el servidor.
 * 
 * Si hiciéramos esta operación a través de un POST, también funcionaría, pero la mejor
 * práctica es utilizar el verbo correspondiente. Como queremos modificar en lugar de agregar
 * nuevo contenido, empleamos PUT o PATCH.
 */
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {
        const { email = '', password = '' } = req.body;
        
        res.status(200).send({ origin: 'server1', payload: `Quiere modificar el id ${id} con el contenido del body`, body: { email, password } });
    }
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const nid = +id; // Conversión a número

    if (nid <= 0 || isNaN(nid)) { // NaN significa Not a Number = no es un número
        res.status(400).send({ origin: 'server1', payload: [], error: 'Se requiere id numérico mayor a 0' });
    } else {        
        res.status(200).send({ origin: 'server1', payload: `Quiere borrar el id ${id}` });
    }
});

app.listen(PORT, () => {
    console.log(`App activa en puerto ${PORT}`);
});
