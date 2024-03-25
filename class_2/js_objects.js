const data = {
    firstName: 'Juan',
    lastName: 'Perez',
    age: 36,
    balance: 16500,
    active: true,
    password: 'abc123'
}

/**
 * El operador spread (tres puntos: ...) tiene varias utilidades.
 * Una de ellas se conoce como rest, combinando con desestructuración,
 * podemos quitar de un objeto las propiedades que no nos interesan.
 * 
 * En este ejemplo, extraemos de data 3 elementos:
 *  - password
 *  - balance
 *  - ...filteredData (con el spread, indicamos que filteredData será
 *       un objeto que contendrá EL RESTO de las propiedades de data)
 */
const { password, balance, ...filteredData } = data; // desestructuración de objeto

console.log(password);
console.log(filteredData);

const objects = [
    { apple: 3, pear: 2, meat: 1, juice: 5, candy: 2 },
    { apple: 1, watermelon: 1, egg: 6, juice: 1, bread: 4 },
]

/**
 * Práctica de forEach(), keys(), includes() y push().
 * 
 * Recorremos un array de objetos, y generamos un nuevo array
 * conteniendo todos los keys del array original, sin repetir.
 */
const filteredObjects = [];
objects.forEach((item) => {
    const keys = Object.keys(item);
    
    keys.forEach((key) => {
        if (!filteredObjects.includes(key)) {
            filteredObjects.push(key);
        }
    }) 
})

console.log(filteredObjects);

/**
 * Estos 3 métodos son también de uso habitual en objetos,
 * para obtener una representación del objeto como array,
 * o acceder SOLO a nombres de propiedad (keys) o valores (values).
 */
console.log(Object.entries(data));
console.log(Object.keys(data));
console.log(Object.values(data));

/**
 * Si necesitamos saber si un objeto incluye cierta propiedad,
 * podemos aplicar el método includes() o el hasOwnProperty()
 */
console.log(Object.keys(data).includes('balance'));
console.log(data.hasOwnProperty('balance'));
