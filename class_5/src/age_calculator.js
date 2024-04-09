/**
 * Práctica para utilizar un módulo de terceros que acabamos de instalar
 * (npm install moment)
 * 
 * Calculamos los años y días transcurridos desde nuestro nacimiento
 */

import moment from 'moment';


// Si llamamos a moment() sin argumentos, nos retorna la fecha y hora actual
const CURRENT_DATE = moment();
// Si lo hacemos con argumento en formato válido, genera un objeto de esa fecha específica
const BIRTH_DATE = moment('1980-01-01 16:00:30');

// Aprovechamos el método isValid() para asegurarnos que ambos objetos de fecha están ok
if (CURRENT_DATE.isValid() && BIRTH_DATE.isValid()) {
    // El método diff() nos permite obtener la diferencia entre 2 fechas, en este
    // caso en días (days), podría ser años (years) u horas (hours).
    const lived_days = CURRENT_DATE.diff(BIRTH_DATE, 'days');
    console.log(`Días vividos: ${lived_days}`);
    // Este console.log() es solo para mostrar la alternativa que nos brindan las templates,
    // pudiendo realizar un cálculo sobre la marcha entre llaves
    console.log(`Años vividos: ${Math.floor(lived_days / 365)}`);
} else {
    console.log('Formato no válido de fechas');
}
