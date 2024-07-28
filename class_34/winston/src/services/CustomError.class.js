/* export default class CustomError {
    static create({ name = 'Error no identificado', cause, message, type}) {
        const error = new Error(message, { cause });
        error.name = name;
        error.type = type;
        throw error;
    }
} */

export default class CustomError extends Error {
    constructor(type, message = '') {
        super(message);
        this.type = type;
    }
}
