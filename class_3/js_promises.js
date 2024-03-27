/**
 * Las promesas son un mecanismo para manejar solicitudes asíncronas.
 * 
 * Por naturaleza, ciertos procesos tardan más que otros al ejecutar, por ejemplo:
 *  - solicitudes HTTP
 *  - accesos a bases de datos
 *  - accesos a archivos en disco
 * 
 * Al manejarnos de forma asíncrona, podemos liberar varias solicitudes a la vez
 * y continuar con otras tareas. A medida que las promesas vayan procesándose,
 * llegarán los datos y podremos utilizarlos.
 */

/**
 * Función síncrona
 * El cálculo se retorna inmediatamente
 */
const syncDivide = (val1, val2) => {
    return val1 / val2;
}

/**
 * Función asíncrona
 * Devolvemos una PROMESA (un COMPROMISO A FUTURO)
 * 
 * Una promesa siempre opera en 3 estados:
 *  1- Pending (pendiente, ni bien disparamos la solicitud y está en proceso)
 *  2- Resolved (resuelta favorablemente)
 *  3- Rejected (rechazada)
 */
const asyncDivide = (val1, val2) => {
    return new Promise((resolve, reject) => {
        if (val2 === 0) {
            // Utilizamos setTimeout() para simular una demora
            setTimeout(() => {
                reject('División por 0'); // Rechazamos la promesa
            }, 3000);
        } else {
            setTimeout(() => {
                resolve(val1 / val2); // Resolvemos favorablemente
            }, 3000);
        }
    });
}

console.log('SISTEMA INICIADO');

// este resultado está disponible de inmediato
console.log(syncDivide(3, 2));

// este no, ya que se trata de una PROMESA, por lo tanto al momento
// de ejecutarse este console.log(), solo veremos el estado actual
// de la promesa, que es Pending.
console.log(asyncDivide(3, 2));

/**
 * Sintaxis tradicional para consumo de promesas con then(), catch(), finally()
 * Esta es la forma correcta de utilizar la promesa para poder aguardar al resultado
 */
asyncDivide(3, 2)
    .then((result) => {
        console.log('Esto se ejecuta si la promesa se resuelve favorablemente');
        console.log(result);
    })
    .catch((error) => {
        console.log('Esto se ejecuta si la promesa se rechaza');
        console.log(error);
    })
    .finally(() => {
        console.log('se ejecuta siempre');
    })
console.log('finalizado');

/**
 * Sintaxis más actualizada con async / await
 * Se trata de lo mismo, continuamos utilizando PROMESAS, pero con una sintaxis
 * más compacta respecto al then() catch() finally()
 * 
 * El modificador async nos permite indicarle a Javascript que esta función se debe
 * manejar de forma asíncrona.
 * 
 * En toda función asíncrona, podremos usar await para esperar el resultado de cualquier
 * proceso que devuelva una promesa (asyncDivide() en este caso)
 */
const asyncCalculation = async () => {
    try {
        const result = await asyncDivide(3, 3);
        // Este console.log() se ejecutará recién al terminarse el proceso de la promesa
        console.log(result);
    } catch (error) {
        // Este console.log() se ejecutará SOLO si la promesa es rechazada (rejected)
        console.log(error);
    }
}

console.log('SISTEMA INICIADO');
asyncCalculation();
console.log('finalizado');
