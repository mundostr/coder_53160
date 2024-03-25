/**
 * Las condiciones son otro de los elementos esenciales en cualquier lenguaje.
 * La palabra reservada para evaluar condiciones es if().
 * 
 * Una condición puede tener una expresión simple o compuesta (varias partes
 * que se conjugan en una), no obstante terminará siempre resolviendo a un
 * resultado booleano (true o false).
 */

let val = 23;

/**
 * Condición con estructura clásica
 * 
 * Evaluamos si val es mayor a 100:
 *  - caso afirmativo (true): mostramos un texto
 *  - caso negativo (false): mostramos otro
 * 
 * Sea true o false, siempre habrá una salida
 */
if (val > 100) {
    console.log('SOBRE el límite');
} else {
    console.log('DEBAJO del límite');
}

/**
 * Condición con estructura clásica sin alternativa
 * 
 * Realizamos la misma evaluación, pero solo generamos salida
 * si la condición es true. No se hace nada en caso de ser false
 */
if (val > 100) {
    console.log('SOBRE el límite');
}

/**
 * Operador ternario
 * 
 * Es sencillamente una sintaxis compacta alternativa al if else.
 * 
 * El signo ? representa al if, el : al else.
 * 
 * Sirve para cuando debemos ejecutar una sola instrucción en la salida,
 * si necesitamos ejecutar varias cosas, podemos colocarlas aparte en un
 * bloque de función por ejemplo, y llamar a esa función.
 */
val > 100 ? console.log('SOBRE el límite'): console.log('DEBAJO del límite');

let value2 = 3;
let value3 = 5;

/**
 * Operadores habituales para condiciones
 * == igual a
 * != distinto a
 * === estrictamente igual a (evalúa además que coincida el tipo de dato)
 * !== estrictamente distinto a (evalúa además que coincida el tipo de dato)
 * 
 * > mayor a
 * >= mayor o igual a
 * < menor a
 * <= menor o igual a
 * 
 * || (o, compuerta o, uno O el otro)
 * && (and, compuerta y, uno Y el otro)
 * 
 * ! (not, negación)
 */

/**
 * Ejemplo operador de negación y operadores booleanos and (&&) y or (||)
 * 
 * and &&: TODOS los elementos de la condición deben ser true para que ésta sea true.
 * or ||: AL MENOS UNO de los elementos de la condición debe ser true para que ésta sea true.
 */
if (value2 === 3) { console.log('es igual a 3'); }
if (value2 !== 2) { console.log('es distinto de 2'); }
if (value2 === 3 && value3 > 10) { console.log('es igual a 3 y mayor a 10'); }
if (value2 === 3 || value3 > 10) { console.log('es igual a 3 o mayor a 10'); }

/**
 * Ifs encadenados (chained)
 * Ni bien una de las condiciones evalúe a true, la cadena se cortará
 */
if (value2 === 1) {
    console.log('BAJO');
} else if (value2 === 2) {
    console.log('MEDIO');
} else if (value2 === 3) {
    console.log('ALTO');
    console.log(value2 ** 3);
} else {
    console.log('NO VALIDO');
}

/**
 * El switch() es una sintaxis alternativa para los ifs en cadena, útil
 * cuando se evalúa una variable que puede tomar distintos valores.
 * 
 * Importante NO OLVIDAR el break en cada caso (case), para cortar la cadena.
 */
switch(value2) {
    case 1:
        console.log('BAJO');
        break;

    case 2:
        console.log('MEDIO');
        break;
    
    case 3:
        console.log('ALTO');
        break;
    
    default:
        console.log('NO VALIDO');
}
