/**
 * Segundo ejemplo de servidor http con Node
 * 
 * En este caso ya comenzaremos a utilizar Express, el framework que nos va
 * a facilitar el armado de nuestra API Rest.
 * 
 * Los pasos esenciales son los mismos (importar, crear instancia y poner a escuchar),
 * pero vemos en este caso que luego de instanciar el servidor, activamos una serie de
 * accesos (llamados ENDPOINTS). Estos accesos devolverán distintos paquetes de datos,
 * permitiendo organizar mejor los distintos contenidos que puede devolver la API.
 * 
 * El cliente armará la solicitud para el endpoint que desee, según el paquete de datos
 * que necesite recuperar.
 */

// Paso 1: importar
import express from 'express';

/// Paso 2: instanciar el servidor
const app = express();

const data = [
    {
        firstName: 'Carlos',
        lastName: 'Perren',
        age: 49,
        active: true
    },
    {
        firstName: 'Pepe',
        lastName: 'Pompin',
        age: 30,
        active: true
    },
    {
        firstName: 'Juan',
        lastName: 'Perez',
        age: 18,
        active: false
    }
]

// Paso 3: definir los endpoints
// Primer endpoint de Express
// req = request = solicitud
// res = response = respuesta
// Este es en endpoint RAIZ, se accede sin agregar nada en la dirección,
// puedo colocar localhost:8000 o localhost:8000/
app.get('/', (req, res) => {
    res.send('Sistema activo');
});

// Se accede como localhost:8000/saludo y devuelve un texto plano.
app.get('/saludo', (req, res) => {
    res.send('Hola a todos desde Express');
});

// Se accede como localhost:8000/bienvenida y devuelve un HTML.
app.get('/bienvenida', (req, res) => {
    res.send('<h1 style="color: #f00;">Bienvenidos!</h1>');
});

// Se accede como localhost:8000/usuarios y devuelve objeto, conteniendo 2
// propiedades (status y payload), payload a su vez contiene el array data.
// Podemos devolver en la respuesta CUALQUIER FORMATO DE OBJETO que deseemos.
app.get('/usuarios', (req, res) => {
    res.send({ status: 1, payload: data });
});

// Primer endpoint con parámetro de tipo req.params
// Se accede como localhost:8000/usuario/2.
// Al parámetro pasado de esta manera lo recuperamos dentro del endpoint
// con req.params.nombre (nombre en este caso es uid), de esta forma
// devolvemos solo el item de data indicado, no todo el array
app.get('/usuario/:uid', (req, res) => {
    const id = req.params.uid;
    res.send({ status: 'OK', payload: data[id] });
});

// Primer endpoint con parámetro de tipo req.query
// Se accede como localhost:8000/usuarioquery?uid=2
// Es otra sintaxis para envío de parámetros, si necesitamos pasar más
// de un parámetro en la url, utilizamos & para separarlos (?uid=2&extended=true)
app.get('/usuarioquery', (req, res) => {
    const id = req.query.uid;
    const extended = req.query.extended;

    if (extended) {
        res.send({ status: 'OK', payload: data[id], extended: 'Versión extendida' });
    } else {
        res.send({ status: 'OK', payload: data[id] });
    }
});

// Paso 4: poner a escuchar el servidor
app.listen(8080, () => {
    console.log('Servidor Express activo en puerto 8080');
});
