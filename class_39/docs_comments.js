/**
 * 
 * @param {number} number Número a redondear
 * @param {number} decimals Cantidad de decimales
 * @returns {number} Número redondeado con decimales fijos
 */
const round = (number, decimals) => {
    const validatedNumber = parseFloat(number);
    const validatedDecimals = parseInt(decimals);
    
    if (isNaN(validatedNumber)) return '0';
    if (isNaN(validatedDecimals)) return number.toFixed(1);
    return (Math.round(number * 10) / 10).toFixed(decimals);
}

const total = 2.388;
const roundTotal = Math.round(total * 10 ) / 10;

console.log(total);
console.log(roundTotal);
console.log(round(total, 2));
