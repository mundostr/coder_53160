/**
 * Práctica de JS
 * Generación de números al azar entre 2 límites (1 y 20)
 * 
 * Los números son insertados en un array, se recorre luego el array
 * y se va armando un objeto cuyas propiedades (keys) son los números
 * al azar que fueron saliendo, y los valores (values) son la cantidad
 * de veces que ha salido cada uno.
 * 
 * Realizamos un control manual para saber si la propiedad ya existe,
 * de ser así incrementamos su valor, sino la creamos con valor 1.
 * 
 * PROBAR utilizando el método reduce() para lograr lo mismo.
 */

const MIN = 1;
const MAX = 20;
const LIMIT = 5;

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

const numbers = [];
for (let i = 0; i < LIMIT; i++) {
    numbers.push(getRandomInt(MIN, MAX));
}

const totals = {};
numbers.forEach(nro => {
    if (totals[nro]) {
        totals[nro] = totals[nro] + 1;
    } else {
        totals[nro] = 1;
    }
});

console.log(numbers);
console.log(totals);
