/**
 * Callback: función pasada como argumento (parámetro) a otra función.
 */

const readings = [22, 23, 23, 21, 20, 18, 19];

// Como hemos repasado, para recorrer un array podemos utilizar un ciclo común
for (let x = 0; x < readings.length; x++) {
    // x++ = expresión compacta de un contador (x = x + 1)
    console.log(readings[x]);
}

// Pero también podemos utilizar métodos predefinidos, como forEach().
// forEach en este caso recibe un CALLBACK, y se encarga de ejecutarlo
// para cada elemento del array (readings)
readings.forEach((item) => {
    console.log(item);
});

// También podemos declarar por separado la función que usaremos como CALLBACK
// y pasarla al forEach() en lugar de inyectar el contenido de forma directa.
const process = (item) => {
    console.log(item);
}
// Atención!, notar que en este caso no llamamos a la función, es decir,
// no utilizamos process(), sino process, la estamos pasando como parámetro
readings.forEach(process);

// Misma situación sucede con map, que recibe un CALLBACK para ejecutar
// en cada elemento del array
/* const filteredReadings = readings.map((item) => {
    return item + 1;
}); */

// Siempre tenemos disponible la notación compacta que nos permiten las arrow
const filteredReadingsCompact = readings.map(x => x + 1);
console.log(filteredReadingsCompact);

const oddOrEven = (val) => {
    /* if (val % 2 === 0) {
        return 'par';
    } else {
        return 'impar';
    } */

    return val % 2 === 0 ? 'par': 'impar';
}

const filtered = readings.map(oddOrEven);
console.log(filtered);
