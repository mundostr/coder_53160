/**
 * Una pequeña clase que hereda de la Error standard de Javascript.
 * 
 * El objetivo de disparar errores a través de esta clase personalizada,
 * es poder incorporar otras propiedades o controles que eventualmente necesitemos.
 */
export default class CustomError extends Error {
    constructor(type, message = '') {
        super(message);
        this.type = type;
    }
}
