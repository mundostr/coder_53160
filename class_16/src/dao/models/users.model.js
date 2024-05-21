import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'users_index';

/**
 * Podemos crear un índica para cualquiera de las propiedades con index: true
 * 
 * ATENCION!: si bien los índices nos permiten acelerar las consultas que
 * involucren filtros sobre las propiedades en cuestión, también suman por
 * otro lado una carga extra de gestión cada vez que el motor debe actualizarlos
 * ante un cambio en la colección, por lo cual es importante el BALANCE.
 * 
 * NO activar índices indiscriminadamente, evaluar las consultas más habituales
 * que se realizarán y activarlos solo en las propiedades necesarias.
 */
const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, index: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'premium', 'user'], default: 'user' }
});

const model = mongoose.model(collection, schema);

export default model;
