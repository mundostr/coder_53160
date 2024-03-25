/**
 * Ejemplo de uso de import
 * 
 * Con esta sintaxis podemos importar contenidos desde otros archivos / módulos.
 * (Ver config.js por export).
 * 
 * Si estamos importando lo exportado por defecto (default), no necesitamos
 * desestructurar (no aparecen las llaves), y podemos utilizar el nombre que
 * deseemos en el import (mainConfig)
 * 
 * Si en cambio importamos exports comunes (no default), debemos utilizar las
 * llaves y los nombres con los que fueron exportados (PI y K)
 * 
 * Atención!: para evitar problemas, incluir siempre la extensión del archivo
 * Javascript al realizar el import
 */

import mainConfig, { PI, K } from './config.js';

console.log(mainConfig.PORT);
console.log(mainConfig.LOCAL_URL);
console.log(PI);
console.log(K);
