/**
 * Muestra de utilización de export.
 * 
 * Un módulo puede exportar tantos elementos como se necesite,
 * pero SOLO UNO puede ser exportado por defecto (default).
 * 
 * En este caso exportamos PI y K de forma standard, además del objeto
 * config como default
 */

export const PI = 3.14;
export const K = 20;

const config = {
    PORT: 3000,
    LOCAL_URL: 'http://localhost'
}

export default config;
