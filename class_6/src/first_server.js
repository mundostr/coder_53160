/**
 * Primer ejemplo de servidor http con Node
 * 
 * Utilizamos el módulo nativo http, y realizamos 3 pasos esenciales:
 * 
 * 1) Importamos el módulo.
 * 2) Creamos la instancia del servidor (createServer).
 * 3) Ponemos a "escuchar" el servidor en un puerto determinado (8080).
 * 
 * De esta forma, si queremos enviar una solicitud al servidor desde un cliente que
 * está corriendo en la misma máquina, utilizamos la dirección:
 * 
 * http://localhost:8080 o http://127.0.0.1:8080
 * 
 * En ese momento, el servidor que está en escucha recibe la solicitud, la procesa
 * y retorna la respuesta configurada.
 */

import http from 'http';

const server = http.createServer((req, res) => {
    console.log('Se recibió una solicitud');
    res.end('Este es el mensaje de respuesta nuevo');
});

server.listen(8080, () => {
    console.log('Servidor activo en puerto 8080');
});
