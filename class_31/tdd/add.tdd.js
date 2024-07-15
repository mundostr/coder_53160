/* // versión 1
const add = (a, b) => {
    if (a === undefined || b === undefined) return 0;
    if (typeof(a) !== 'number' || typeof(b) !== 'number') return null;
    return a + b;
} */

/* // versión 2
const add = (...params) => {
    let total = 0;

    for (let i = 0; i < params.length; i++) {
        if (params[i] === undefined) return 0;
        if (typeof(params[i]) !== 'number') return null;
        total += params[i];
    }

    return total;
} */

// versión 3
const add = (...params) => {
    if (params.length === 0 || params.some(param => param === undefined)) return 0;
    if (params.some(param => typeof(param) !== 'number')) return null;
    return params.reduce((acc, param) => acc += param);
}


// Flujo principal
let passed = 0;

const tests = [
    { process: add(3, 2), should_return: 5, desc: 'Debe poder sumar correctamente'},
    { process: add(3, 'pepe'), should_return: null, desc: 'Debe devolver null si algún parámetro no es numérico'},
    { process: add(), should_return: 0, desc: 'Debe devolver 0 si no recibe parámetros'},
    { process: add(3, 2, 1, 5), should_return: 11, desc: 'Debe poder sumar correctamente con cantidad variables de parámetros'},
    { process: add(3, 2, -1), should_return: 4, desc: 'Debe poder sumar correctamente con números negativos'}
];

tests.forEach(test => {
    if (test.process === test.should_return) {
        passed++;
        console.log(`${test.desc} (${test.should_return}): OK`);
    } else {
        console.log(`${test.desc} (${test.should_return}): ERR`);
    }
});
console.log(`Pruebas superadas: ${passed}/${tests.length}`);
