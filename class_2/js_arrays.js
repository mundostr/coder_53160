const values = [3, 5, 8, 23];

/**
 * Podemos recorrer un array con un ciclo standard (for())
 */
let valuePresent = false; // marcador = flag
for (let i = 0; i < values.length; i++) {
    if (values[i] === 8) {
        valuePresent = true;
    }
}
console.log(valuePresent);

/**
 * Por supuesto, tenemos también métodos útiles para agilizar distintas
 * operaciones (find, map, forEach, etc, etc).
 * 
 * En este caso utilizamos includes para saber si el array incluye
 * determinado valor, la línea debajo nos permite lograr lo mismo
 * que el bloque de código for() más arriba.
 */
console.log(values.includes(8));
