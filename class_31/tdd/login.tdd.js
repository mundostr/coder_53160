const login = (user, pass) => {
    if (user === undefined || user === null || user === '') return 'Falta usuario';
    if (pass === undefined || pass === null || pass === '') return 'Falta password';
    if (user !== testUser) return 'Usuario incorrecto';
    if (pass !== testPass) return 'Password incorrecto';
    return 'Logueado';
}


// Flujo principal
const testUser = 'cperren';
const testPass = 'abc123';
let passed = 0;

const tests = [
    { process: login('cperren', 'abc123'), should_return: 'Logueado', desc: 'Debe retornar Logueado con datos correctos'},
    { process: login('', 'abc123'), should_return: 'Falta usuario', desc: 'Debe retornar Falta usuario si se omite user'},
    { process: login('cperren', ''), should_return: 'Falta password', desc: 'Debe retornar Falta password si se omite password'},
    { process: login('cferrero', 'abc123'), should_return: 'Usuario incorrecto', desc: 'Debe retornar Usuario incorrecto con user incorrecto'},
    { process: login('cperren', 'abc456'), should_return: 'Password incorrecto', desc: 'Debe retornar Password incorrecto con pass incorrecto'}
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
