import mongoose from 'mongoose';
// En lugar de manejar el paginado manualmente, aprovechamos un módulo
// externo que nos devolverá en la misma consulta toda la info necesaria.
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

/**
 * users_index contiene los 5000 usuarios de prueba que aprovechamos
 * días atrás para los índices, habilitar para probar la paginación.
 * 
 * users_aggregate contiene unos pocos usuarios para prueba de aggregate
 * 
 * (importar desde archivos json en carpeta class_17)
 */
// const collection = 'users_index';
const collection = 'users_aggregate';

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, index: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'premium', 'user'], default: 'user' },
    // Las propiedades grade y region las colocamos para probar el uso de aggregate,
    // deshabilitarlas al testear el paginado con la otra colección
    grade: { type: Number, required: true },
    region: { type: String, enum: ['Cordoba', 'Buenos Aires', 'Tucuman', 'Mendoza', 'Rosario'], default: 'Cordoba' }
});

// Para paginar automáticamente con Mongoose Paginate V2, debemos activar el
// módulo como plugin mediante esta línea, con ello tendremos disponible
// un método paginate() para realizar las consultas.
schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
