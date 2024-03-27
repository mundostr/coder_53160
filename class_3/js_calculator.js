/**
 * Ejercicio de calculadora utilizando PROMESAS
 * 
 * Funciones para sumar, restar, multiplicar y dividir
 */

/**
 * Si ambos operandos son distintos de cero y el resultado positivo, debe devolver la suma
 * Si el resultado es menor a cero, indicar que solo opera con valores positivos
 * Caso contrario, retornar operación no válida
 */
const add = (val1, val2) => {
    return new Promise((resolve, reject) => {
        if (val1 !== 0 && val2 !== 0) {
            const operation = val1 + val2;
            
            if (operation < 0) {
                reject('Solo se opera con valores positivos');
            } else {
                resolve(operation);
            }
        } else {
            reject('Operación no válida');
        }
    });
}

/**
 * Idem caso anterior
 */
const subtract = (val1, val2) => {
    return new Promise((resolve, reject) => {
        if (val1 !== 0 && val2 !== 0) {
            const operation = val1 - val2;
            
            if (operation < 0) {
                reject('Solo se opera con valores positivos');
            } else {
                resolve(operation);
            }
        } else {
            reject('Operación no válida');
        }
    });
}

const multiply = (val1, val2) => {
    return new Promise((resolve, reject) => {
        if (val1 > 0 && val2 > 0) {
            const operation = val1 * val2;
            resolve(operation);
        } else {
            reject('Operación no válida');
        }
    });
}

const divide = (val1, val2) => {
    return new Promise((resolve, reject) => {
        if (val1 > 0 && val2 > 0) {
            const operation = val1 / val2;
            resolve(operation);
        } else {
            reject('Operación no válida');
        }
    });
}

/**
 * Recibe 3 parámetros
 * 2 son los operandos, el tercero el callback que debe ejecutar
 * (si debe sumar, restar, multiplicar o dividir)
 */
const calculate = async (val1, val2, callback) => {
    try {
        const result = await callback(val1, val2);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

// Llamamos a calculate, como último parámetro pasamos el callback que debe ejecutar
calculate(3, 2, add);
calculate(0, 3, subtract);
calculate(3, -5, multiply);
calculate(3, 2, divide);
